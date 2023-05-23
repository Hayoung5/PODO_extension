var reports = {}
const ethers = require("ethers");

const alchemy = require("./alchemy.js");
const etherscan = require("./etherscan.js")
const db = require("./db.js");

const parseDomain = (domain) => {
  splitted = domain.split(".");
  parseResult = splitted[0];
  for(i = 1; i < splitted.length; i++) {
    parseResult = splitted[i] + "/" + parseResult;
  }
  return parseResult;
}


const getReportsFromHash = async (hashes = []) => {
  var result = [];

  for(hash of hashes) {
    await db.ref("Reports/" + hash).get().then(ret => {
      if(ret.exists()) {
        result.push(ret.val());
      }
    });
  }

  return result;
}

reports.getLogs = async (reporter) => {
  const logRef = db.ref("ReportLog/" + reporter);
  var snapshot = {};
  await logRef.get().then(ret => {
    if(ret.exists()) {
      snapshot = ret.val();
    } else {
      snapshot = {
        reportCount: 0,
        reportHistory: [],
      };
    }
  });
  snapshot.reportHistory = await getReportsFromHash(snapshot.reportHistory);
  return snapshot;
}

reports.riskAddress = async (address) => {
  if(!validAddress(address)) {
    throw new Error("Invalid Address: " + address)
  }

  // if the address in lowercase convert to checksum address
  if(/^[/^[0-9a-z]+$/.test(address)){
    address = ethers.utils.getAddress(address);
  }

  // add "await" to return isContract's result, if not isContract is promise
  var isContract = await etherscan.isContract(address);
  var snapshot = {};
  if(isContract) {
    var isVerified = await etherscan.isVerified(address);

    await db.ref("ReportedContract/" + address).get().then(ret => {
      if(ret.exists()) {
        snapshot = ret.val();
      } else {
        snapshot = null;
      }
    });

    if(snapshot == null) {
      if(isVerified)
        return {
          risk: 1,
          reportCount: 0,
          damageAmount: 0,
          reportHistory: [],
          txReportCount: 0,
          isContract: true,
          isVerified: true,
        }
      else
        return {
          risk: 2,
          reportCount: 0,
          damageAmount: 0,
          reportHistory: [],
          txReportCount: 0,
          isContract: true,
          isVerified: false,
        }
    } else {
      if((!isVerified &&
          (snapshot.reportCount > 2 ||
          snapshot.txReportCount > 0)) ||
        snapshot.damage > 10 ||
        snapshot.txReportCount > 1 ||
        snapshot.reportCount > 4 ||
        snapshot.blacklisted)
      {
        snapshot.risk = 3;
      }
      else if(!isVerified || snapshot.reportCount > 0)
      {
        snapshot.risk = 2;
      }
      else snapshot.risk = 1;

      snapshot.isVerified = isVerified;
      snapshot.isContract = true;
      snapshot.reportHistory = await getReportsFromHash(snapshot.reportHistory);
      return snapshot;
    }
  } else {
    await db.ref("ReportedAccount/" + address).get().then(ret => {
      if(ret.exists()) {
        snapshot = ret.val();
      } else {
        snapshot = null;
      }
    });

    if(snapshot == null) {
      return {
        risk: 1,
        reportCount: 0,
        damageAmount: 0,
        reportHistory: [],
        txReportCount: 0,
        isContract: false,
      }
    } else {
      if(snapshot.damage > 10 ||
        snapshot.txReportCount > 1 ||
        snapshot.reportCount > 4 ||
        snapshot.blacklisted)
      {
        snapshot.risk = 3;
      }
      else if(snapshot.reportCount > 0)
      {
        snapshot.risk = 2;
      }
      else snapshot.risk = 1;

      snapshot.isContract = false;
      snapshot.reportHistory = await getReportsFromHash(snapshot.reportHistory);
      return snapshot;
    }
  }
}

reports.riskDomain = async (domain) => {
  // Declare result object
  const result = {
    risk: undefined,
    reportCount: undefined,
    reportHistory: undefined,
    blackListed: undefined,
    whiteListed: undefined,
    description: undefined,
  }
  
  if(!validDomain(domain)) {
    throw new Error("Invalid Domain: " + domain);
  }

  const parseResult = parseDomain(domain);
  await db.ref("ReportedSite/" + parseResult).get().then(async (ret) => {
    if(ret.exists()) {
      const snapshot = ret.val();
      result.reportCount = snapshot.reportCount;
      result.reportHistory = await getReportsFromHash(snapshot.reportHistory);

      if (snapshot.reportCount > 9) {
        result.risk = 3;
      } else if (snapshot.reportCount > 0) {
        result.risk = 2;
      } else {
        result.risk = 1;
      }
    } else {
      result.risk = 1;
      result.reportCount = 0;
      result.reportHistory = [];
    }
  });

  // Check if a domain is blacklisted or whitelisted
  await db.ref("Domains/Blacklist").get().then(ret => {
      const snapshot2 = ret.val();
      for (el of snapshot2) {
        if (el.domain === domain) {
          result.risk = 3;
          result.blackListed = true;
          result.whiteListed = false;
          result.description = el.description;
          break;
        }
      }
  });

  await db.ref("Domains/Whitelist").get().then(ret => {
    const snapshot2 = ret.val();
    for (el of snapshot2) {
      if (el.domain === domain) {
        result.whiteListed = true;
        result.description = el.description;
        break;
      }
    }
  });

  return result;
}

reports.reportDomain = async (domain, hash) => {
  
  const parseResult = parseDomain(domain);
  var snapshot = {};
  await db.ref("ReportedSite/" + parseResult).get().then(ret => {
    if(ret.exists()) {
      snapshot = ret.val();
    } else {
      snapshot = null;
    }
  });
  
  var count = 0;
  if(snapshot != null) {
    count = snapshot.reportCount;
  }

  var updates = {}

  updates['/reportCount'] = count + 1;
  updates['/reportHistory/' + count] = hash;

  db.ref("ReportedSite/" + parseResult).update(updates);
}

reports.reportAccount = async (address, hasTx, damage, hash) => {
  const accRef = db.ref("ReportedAccount/" + address);
  var snapshot = {};
  await accRef.get().then(ret => {
    if(ret.exists()) {
      snapshot = ret.val();
    } else {
      snapshot = null;
    }
  });

  var count = 0;
  var txcount = 0;
  var accDamage = 0;
  if(snapshot != null) {
    count = snapshot.reportCount;
    txcount = snapshot.txReportCount;
    accDamage = snapshot.damageAmount;
  }

  var updates = {};

  updates["/reportCount"] = count + 1;
  updates["/txReportCount"] = txcount + (hasTx ? 1 : 0);
  updates["/damageAmount"] = accDamage + damage;
  updates["/reportHistory/" + count] = hash;

  accRef.update(updates);
}


reports.reportContract = async (address, hasTx, damage, hash) => {
  const ctrRef = db.ref("ReportedContract/" + address);
  var snapshot = {};
  await ctrRef.get().then(ret => {
    if(ret.exists()) {
      snapshot = ret.val();
    } else {
      snapshot = null;
    }
  });

  var count = 0;
  var txcount = 0;
  var accDamage = 0;
  if(snapshot != null) {
    count = snapshot.reportCount;
    txcount = snapshot.txReportCount;
    accDamage = snapshot.damageAmount;
  }

  var updates = {};

  updates["/reportCount"] = count + 1;
  updates["/txReportCount"] = txcount + (hasTx ? 1 : 0);
  updates["/damageAmount"] = accDamage + damage;
  updates["/reportHistory/" + count] = hash;

  ctrRef.update(updates);
}

const deleteReportFromReporter = async (reporter, hash) => {
  var snapshot = {};
  await db.ref("ReportLog/" + reporter).get().then(ret => {
    if(ret.exists()) {
      snapshot = ret.val();
    } else {
      console.log("Reported Log Not Found");
      return;
    }
  });
  
  var count = snapshot.reportCount;
  var reportHistory = snapshot.reportHistory;

  var found = false;
  for(var i = 0; i < reportHistory.length; i++) {
    if(reportHistory[i] == hash) {
      reportHistory.splice(i, 1);
      found = true;
      break;
    }
  }
  if(!found) {
    console.log("Report Not Found in Logs");
    return;
  }

  var updates = {}

  updates['/reportCount'] = count - 1;
  updates['/reportHistory'] = reportHistory;

  db.ref("ReportLog/" + reporter).update(updates);

}

const deleteReportFromDomain = async (domain, hash) => {
  const parseResult = parseDomain(domain);
  var snapshot = {};
  await db.ref("ReportedSite/" + parseResult).get().then(ret => {
    if(ret.exists()) {
      snapshot = ret.val();
    } else {
      console.log("Reported Domain Not Found");
      return;
    }
  });
  
  var count = snapshot.reportCount;
  var reportHistory = snapshot.reportHistory;

  var found = false;
  for(var i = 0; i < reportHistory.length; i++) {
    if(reportHistory[i] == hash) {
      reportHistory.splice(i, 1);
      found = true;
      break;
    }
  }
  if(!found) {
    console.log("Report Not Found in Domain");
    return;
  }

  var updates = {}

  updates['/reportCount'] = count - 1;
  updates['/reportHistory'] = reportHistory;

  db.ref("ReportedSite/" + parseResult).update(updates);
}

const deleteReportFromAccount = async (address, hasTx, damage, hash) => {
  const accRef = db.ref("ReportedAccount/" + address);
  var snapshot = {};
  await accRef.get().then(ret => {
    if(ret.exists()) {
      snapshot = ret.val();
    } else {
      console.log("Reported Account Not Found");
      return;
    }
  });

  var count = snapshot.reportCount;
  var txcount = snapshot.txReportCount;
  var accDamage = snapshot.damageAmount;
  var reportHistory = snapshot.reportHistory;

  var found = false;
  for(var i = 0; i < reportHistory.length; i++) {
    if(reportHistory[i] == hash) {
      reportHistory.splice(i, 1);
      found = true;
      break;
    }
  }
  if(!found) {
    console.log("Report Not Found in Account");
    return;
  }

  var updates = {};

  updates["/reportCount"] = count - 1;
  updates["/txReportCount"] = txcount - (hasTx ? 1 : 0);
  updates["/damageAmount"] = accDamage - damage;
  updates["/reportHistory"] = reportHistory;

  accRef.update(updates);
}

const deleteReportFromContract = async (address, hasTx, damage, hash) => {
  const ctrRef = db.ref("ReportedContract/" + address);
  var snapshot = {};
  await ctrRef.get().then(ret => {
    if(ret.exists()) {
      snapshot = ret.val();
    } else {
      console.log("Reported Contract Not Found");
      return;
    }
  });

  var count = snapshot.reportCount;
  var txcount = snapshot.txReportCount;
  var accDamage = snapshot.damageAmount;
  var reportHistory = snapshot.reportHistory;

  var found = false;
  for(var i = 0; i < reportHistory.length; i++) {
    if(reportHistory[i] == hash) {
      reportHistory.splice(i, 1);
      found = true;
      break;
    }
  }
  if(!found) {
    console.log("Report Not Found in Contract");
    return;
  }

  var updates = {};

  updates["/reportCount"] = count - 1;
  updates["/txReportCount"] = txcount - (hasTx ? 1 : 0);
  updates["/damageAmount"] = accDamage - damage;
  updates["/reportHistory"] = reportHistory;

  ctrRef.update(updates);
}


reports.reportHash = (report) => {
  return ethers.utils.base58.encode(
    ethers.utils.solidityKeccak256(
      ["string", "string", "string", "string"],
      [report.address,
       report.associatedTx,
       report.domain,
       report.reporter]
  ))
}

/* report = 
{
  address: "0x1234",
  associatedTx: "0xabcdef12",
  content: "Description",
  domain: "a.example.com",
  reporter: "0x0987",
  timestamp: 1683210000,
} */
reports.newReport = async (report, hash) => {
  if(!validAddress(report.address) && !validDomain(report.domain)) {
    throw new Error("Invalid Report!");
  }

  var data = {
    address: "",
    associatedTx: "",
    content: report.content,
    damage: 0,
    domain: "",
    reporter: report.reporter,
    timestamp: report.timestamp,
  };

  if(validAddress(report.address)) {
    var damage = 0;
    const _hasTx = validTx(report.associatedTx);
    if(_hasTx) {
      damage = await alchemy.getDamage(report.associatedTx, report.reporter, report.address);
      data.associatedTx = report.associatedTx;
    }
    // add "await" to return isContract's result, if not isContract is promise
    const isContract = await etherscan.isContract(report.address);

    if(isContract) {
      reports.reportContract(report.address, _hasTx, damage, hash);
    } else {
      reports.reportAccount(report.address, _hasTx, damage, hash);
    }
    data.address = report.address;
    data.damage = damage;
  }

  if(validDomain(report.domain)) {
    reports.reportDomain(report.domain, hash);
    data.domain = report.domain;
  }

  db.ref("Reports/" + hash).set(data);

  const logRef = db.ref("ReportLog/" + report.reporter);
  var snapshot = {};
  await logRef.get().then(ret => {
    if(ret.exists()) {
      snapshot = ret.val();
    } else {
      snapshot = null;
    }
  });

  var count = 0;
  if(snapshot != null) {
    count = snapshot.reportCount;
  }

  var updates = {};

  updates["/reportCount"] = count + 1;
  updates["/reportHistory/" + count] = hash;

  logRef.update(updates);
}

reports.deleteReport = async (report, hash) => {
  if(validAddress(report.address)) {
    const _hasTx = validTx(report.associatedTx);
    var isContract = await etherscan.isContract(report.address)
    if(isContract) {
      await deleteReportFromContract(report.address, _hasTx, report.damage, hash);
    } else {
      await deleteReportFromAccount(report.address, _hasTx, report.damage, hash);
    }
  }
  if(validDomain(report.domain)) {
    await deleteReportFromDomain(report.domain, hash);
  }
  if(validAddress(report.reporter)) {
    await deleteReportFromReporter(report.reporter, hash);
  }
}

const validAddress = (address) => {
  try {
    return (address.length == 42 && address.slice(0, 2) == "0x");
  } catch {
    return false;
  }
}
const validDomain = (domain) => {
  try {
    return typeof domain == "string";
  } catch {
    return false;
  }
}
const validTx = (txHash) => {
  try {
    return (txHash.length == 66 && txHash.slice(0, 2) == "0x");
  } catch {
    return false;
  }
}

module.exports = reports;