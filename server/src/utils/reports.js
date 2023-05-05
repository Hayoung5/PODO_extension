var reports = {}
const admin = require("firebase-admin");
    
const serviceAccount = require("../../.podo.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://podo-wallet-default-rtdb.asia-southeast1.firebasedatabase.app"
});

// Realtime Database 참조 가져오기
const db = admin.database();

const parseDomain = (domain) => {
  splitted = domain.split(".");
  parseResult = splitted[0];
  for(i = 1; i < splitted.length; i++) {
    parseResult = splitted[i] + "/" + parseResult;
  }
  return parseResult;
}

reports.pushReport = (report) => {
  return db.ref("Reports").push(report).key
}

reports.reportDomain = async (domain, reportIndex) => {
  
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
  updates['/reportHistory/' + count] = reportIndex;

  db.ref("ReportedSite/" + parseResult).update(updates);
}

reports.reportAccount = async (address, hasTx, damage, reportIndex) => {
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
  updates["/reportHistory/" + count] = reportIndex;

  accRef.update(updates);
}


reports.reportContract = async (address, hasTx, damage, reportIndex) => {
  const ctrRef = db.ref("ReportedContract/" + address);
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
  updates["/reportHistory/" + count] = reportIndex;

  ctrRef.update(updates);
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
reports.newReport = async (report) => {
  //isContract = etherscan.
}



