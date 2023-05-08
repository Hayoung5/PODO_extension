utils = {}

const etherscan = require("./etherscan.js");
const db = require("./db.js");
const reports = require("./reports.js");

const APPROVE = "095ea7b3"
const SETAPPROVALFORALL = "a22cb465"

// risk measures
// 0: whitelisted
// 1: standard
// 2: reported / unvalidated
// 3: blacklisted
utils.lookupAddress = async (address, network="mainnet") => {
    var risk = 1;
    const data = (await db.ref("").get()).val();
    if(data != null) {
        risk = data.risk;
        if(risk == 0 || risk == 3) return risk;
    }

    isContract = await etherscan.isContract(address, network);
    isVerified = await etherscan.isVerified(address, network);
    if(isContract && !isVerified) risk = 2;
    return risk;
}

utils.txRisk = async (tx) => {
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

utils.doReport = async (report) => {
    const hash = reports.reportHash(report);
    const reportRef = await db.ref("Reports/" + hash).get();

    if(!reportRef.exists()) {
        reports.newReport(report, hash);
    } else {
        // Update Report
        db.ref("Reports/" + hash).update({
            content: report.content,
            timestamp: report.timestamp,
        })
    }
}


const chainName = (chainid) => {
    if(chainid == 1) return "mainnet";
    else if(chainid == 5) return "goerli";
    else if(chainid == 11155111) return "sepolia";
    return "none";
}



module.exports = utils;