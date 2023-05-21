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
utils.lookupAddress = async (address) => {
    return await reports.riskAddress(address);
}

utils.lookupDomain = async (domain) => {
    var data = await reports.riskDomain(domain);
    if(data == null)
        return {
            risk: 1,
            reportCount: 0
        }
    return data;
}

utils.getLogs = async (reporter) => {
    return await reports.getLogs(reporter);
}

utils.txRisk = async (tx) => {
    // the tx look like
    // tx = {
    //     id : chainid,
    //     ...
    //     params : {from, to, data}
    // }

    const params = tx.params[0];
    const chainid = tx.id;
    const network = chainName(chainid);

    // if(params.to) {
    //     const destRisk = await utils.lookupAddress(params.to, network);
    //     console.log("search result");
    //     console.log(destRisk);
    //     return destRisk;
    // }

    if (params.data.includes(APPROVE)) {
        return("APPROVE");
    };
    if (params.data.includes(SETAPPROVALFORALL)) {
        return("SETAPPROVALFORALL");
    };

    return (1);
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