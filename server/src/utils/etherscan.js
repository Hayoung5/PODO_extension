var etherscan = {};

require("dotenv").config();

const axios = require("axios").default;

async function etherscanRequest(params = {}, network = "mainnet") {
    params["apikey"] = process.env.ETHERSCAN_API_KEY;
    url = network == "mainnet" ? "https://api.etherscan.io/api/" : "https://api-" + network + ".etherscan.io/api/"
    return axios({
        method: "get",
        url: url,
        params: params,
    });
}

etherscan.getDamage = async (tx) => {
    return 0;
}

etherscan.isVerified = async (address, network = "mainnet") => {
    res = await etherscanRequest({
        "module": "contract",
        "action": "getabi",
        "address": address,
        },
        network
    ).catch(console.error);
    
    if(res.data.result == 'Contract source code not verified') return false;
    else return true;
}

etherscan.isContract = async (address, network = "mainnet") => {
    res = await etherscanRequest({
        "module": "proxy",
        "action": "eth_getCode",
        "address": address,
        },
        network
    ).catch(console.error);

    if(res.data.result == '0x') return false;
    else return true;
}

module.exports = etherscan;