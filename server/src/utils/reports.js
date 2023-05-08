var reports = {}
const ethers = require("ethers");

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

reports.reportHash = (report) => {
  return ethers.utils.base64.encode(
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
  if(!hasAddress(report) && !hasDomain(report)) {
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

  if(hasAddress(report)) {
    var damage = 0;
    const _hasTx = hasTx(report);
    if(_hasTx) {
      damage = etherscan.getDamage(report.associatedTx);
      data.associatedTx = report.associatedTx;
    }
    const isContract = etherscan.isContract(report.address);

    if(isContract) {
      reports.reportContract(report.address, _hasTx, damage, hash);
    } else {
      reports.reportAccount(report.address, _hasTx, damage, hash);
    }
    data.address = report.address;
    data.damage = damage;
  }

  if(hasDomain(report)) {
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

const hasAddress = (report) => {
  try {
    return (report.address.length == 42 && report.address.slice(0, 2) == "0x");
  } catch {
    return false;
  }
}
const hasDomain = (report) => {
  try {
    return typeof report.domain == "string";
  } catch {
    return false;
  }
}
const hasReporter = (report) => {
  try {
    return (report.reporter.length == 42 && report.reporter.slice(0, 2) == "0x");
  } catch {
    return false;
  }
}
const hasTx = (report) => {
  try {
    return (report.associatedTx.length == 66 && report.associatedTx.slice(0, 2) == "0x");
  } catch {
    return false;
  }
}

module.exports = reports