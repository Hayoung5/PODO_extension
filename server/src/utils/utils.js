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
    const txData = params.data;

    let risk;

    // contract를 배포하는 경우 params.to가 없음!
    if (!params.to){
        return({risk : 0})
    }
    const destRisk = await utils.lookupAddress(params.to);
    
    
    destRisk.inputValue = params.to;
    if(txData === "0x") return destRisk;

    selector = txData.substring(2, 10);


    if (selector == APPROVE || selector == SETAPPROVALFORALL) {
        const inputValue = "0x" + txData.substring(34, 74);
        risk = await utils.lookupAddress("0x" + txData.substring(34, 74), network);
        risk.inputValue = inputValue;

        if(!risk.isContract) {
            risk.risk = 3;
        }
        // save more info to response
        if (selector == APPROVE) {
            risk.txInfo = "APPROVE";
        } else if (selector == SETAPPROVALFORALL){
            risk.txInfo = "SETAPPROVALFORALL";
        }
    } else {
        risk = destRisk;
    }
    return (risk);
}


utils.doReport = async (report) => {
    const hash = reports.reportHash(report);
    const reportRef = await db.ref("Reports/" + hash).get();

    if(!reportRef.exists()) {
        await reports.newReport(report, hash);
    } else {
        // Update Report
        db.ref("Reports/" + hash).update({
            content: report.content,
            timestamp: report.timestamp,
        })
    }
}

utils.deleteReport = async (hash) => {
    const reportRef = db.ref("Reports/" + hash);

    await reportRef.get().then(async ret => {
        if(!ret.exists()) {
            throw new Error("Report Not Exists");
        } else {
            await reports.deleteReport(ret.val(), hash);
        }
    });

    reportRef.remove().then(() => {
        console.log("Report (" + hash + ") removed.");
    });
}

const chainName = (chainid) => {
    if(chainid == 1) return "mainnet";
    else if(chainid == 5) return "goerli";
    else if(chainid == 11155111) return "sepolia";
    return "none";
}

module.exports = utils;