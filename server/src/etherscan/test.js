const ethers = require("ethers");
const etherscan = require("./etherscan");

const APPROVE = "095ea7b3"
const SETAPPROVALFORALL = "a22cb465"

async function lookupAddress(address) {
    // DB lookup
    isContract = await etherscan.isContract(address);
    isVerified = await etherscan.isVerified(address);
    if(isContract && !isVerified) return 2;
}

async function txRisk(tx) {
    txData = tx.data;
    destRisk = await lookupAddress(tx.to);

    if(txData == "0x") return destRisk;

    selector = txData.substring(2, 10);
    let risk;

    if (selector == APPROVE || selector == SETAPPROVALFORALL) {
        risk = await lookupAddress("0x" + txData.substring(34, 74));
    } else {
        risk = 1;
    }
}

async function test() {
    v = await etherscan.isVerified("0xdac17f958d2ee523a2206206994597c13d831ec7");
    console.log(v);
}


test();