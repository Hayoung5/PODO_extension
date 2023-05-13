const { Alchemy, Network } = require("alchemy-sdk");
const ethers = require("ethers")

require("dotenv").config();

const config = {
    apiKey: process.env.ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(config);

const ethChange = async (address, block) => {
    var [beforeBal, afterBal] = await Promise.all([
        alchemy.core.getBalance(address, block - 1),
        alchemy.core.getBalance(address, block),
    ])
    return ethers.utils.formatEther(afterBal.sub(beforeBal));
}

module.exports.getDamage = async (tx, from, to) => {
    const receipt = await alchemy.core.getTransactionReceipt(tx);
    const block = parseInt(receipt.block, 16);
    if(receipt.from != from) throw new Error("Not from reporter");
    if(receipt.status != 1) throw new Error("Tx not successful");
    
    var [fromChange, toChange] = await Promise.all([
        ethChange(from, block),
        ethChange(to, block)
    ]);
    if(fromChange > 0) throw new Error("No damage done");
    
    return fromChange * (-1);
}

// const erc20Change = async (address, block, token) => {
//     var tokens = [];
//     tokens.push(token);
//     var [beforeBal, afterBal] = await Promise.all([
//         alchemy.core.getTokenBalances(address, block - 1, tokens),
//         alchemy.core.getTokenBalances(address, block, tokens),
//     ])
//     beforeBal = beforeBal.tokenBalances[0].tokenBalance;
//     afterBal = afterBal.tokenBalances[0].tokenBalance;
//     decimal = (await alchemy.core.getTokenMetadata(beforeBals.tokenBalances[i].contractAddress)).decimals;
//     return ethers.utils.formatEther(beforeBal.sub(afterBal));      
// }

async function test() {
    const res = await erc20Change("0x9c32df9fbc97c7bcfd9ca627ac1adcde9dfefc57", 17251331, "0x6982508145454ce325ddbe47a25d4ec3d2311933")

    console.log(res);
}

test();
