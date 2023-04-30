const etherscan = require("./etherscan.js");

const admin = require("firebase-admin");
const serviceAccount = require("../../.podo.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://podo-wallet-default-rtdb.asia-southeast1.firebasedatabase.app"
});

// Realtime Database 참조 가져오기
const db = admin.database();
const accountsRef = db.ref('Accounts');
const domainsRef = db.ref('Domains');
const LogRef = db.ref('Log');

const APPROVE = "095ea7b3"
const SETAPPROVALFORALL = "a22cb465"

// risk measures
// 0: whitelisted
// 1: standard
// 2: reported / unvalidated
// 3: blacklisted
export async function lookupAddress(address, network="mainnet") {
    var risk = 1;
    const data = (await accountsRef.child("0x0000000").get()).val();
    if(data != null) {
        risk = data.risk;
        if(risk == 0 || risk == 3) return risk;
    }

    isContract = await etherscan.isContract(address, network);
    isVerified = await etherscan.isVerified(address, network);
    if(isContract && !isVerified) risk = 2;
    return risk;
}

export async function txRisk(tx) {
    const txData = tx.data;
    const chainid = tx.chainId;
    const network = chainName(chainid);

    destRisk = await lookupAddress(tx.to, network);

    if(txData == "0x") return destRisk;

    selector = txData.substring(2, 10);
    var risk = 1;

    if (selector == APPROVE || selector == SETAPPROVALFORALL) {
        risk = await lookupAddress("0x" + txData.substring(34, 74), network);
    } else {
        risk = 1;
    }

    return risk;
}

function chainName(chainid) {
    if(chainid == 1) return "mainnet"
    else if(chainid == 5) return "goerli"
    else if(chainid == 11155111) return "sepolia"
    return "none"
}
