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

    var risk;
    const destRisk = await utils.lookupAddress(params.to)
    if(txData == "0x") return destRisk;

    selector = txData.substring(2, 10);

    if (selector == APPROVE || selector == SETAPPROVALFORALL) {
        risk = await utils.lookupAddress("0x" + txData.substring(34, 74), network);
        if(!risk.isContract) {
            risk.risk = 3;
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
async function test() {
    await utils.doReport({
        address: '0xc8e15585ED23d2C08B3d7a845060a3050261568B',
        associatedTx: '0x4b9154dbbac00f3b9c6f5c750954e3aa0db978a6761d13a22247253c77083546',
        content: '아디다스 NFT를 무료 민팅한다기에 클릭했는데 이더리움이 사라졌어요.',
        damage: 0,
        domain: 'adidas.virtual-gear.net',
        reporter: '0x9CbCcDF8A64b10164bD1da6061f74bFF04D79ca3',
        timestamp: 1684137165
      });
    //await utils.deleteReport("3C8Y46y4pm2B3ASZzz9n59MsiWs3tiogjLdE8SPM3GwR");
    //await utils.deleteReport("4JYYRgH1NZ3LXkCAttAEVkM1zAym3KhSTJb1PutF6Vb5")
}
test();

module.exports = utils;