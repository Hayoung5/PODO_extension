/*global chrome*/
const ethers = require("ethers");
const lightwallet = require("eth-lightwallet");
var CryptoJS = require("crypto-js");

const url = process.env.REACT_APP_PRIVATE_RPC_URL;
const provider = ethers.getDefaultProvider('goerli');
//const provider = new ethers.providers.JsonRpcProvider('https://mainnet.infura.io/v3/your-project-id');


export const createWallet = async (password) => {
    const mnemonic = await lightwallet.keystore.generateRandomSeed();
    const keyStore = await new Promise((resolve, reject) => {
        lightwallet.keystore.createVault(
            {
                password: password,
                seedPhrase: mnemonic,
                hdPathString: "m/44'/60'/0'/0",
            },
            (err, ks) => {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    ks.keyFromPassword(password, (err, pwDerivedKey) => {
                        if (err) {
                            console.error(err);
                            reject(err);
                        } else {
                            ks.generateNewAddress(pwDerivedKey, 1);
                            resolve({ks, pwDerivedKey})
                        }
                    });
                }
            }
        );
    });

    // 키스토어를 암호화합니다. 최초 생성시 키스토어 암호화는 password로 함.
    const encryptedKeystore = CryptoJS.AES.encrypt(JSON.stringify(keyStore.ks), password).toString();
    const address = keyStore.ks.getAddresses()[0];

    chrome.storage.local.set({address : address});
    chrome.storage.local.set({encryptedKeystore : encryptedKeystore});
    console.log("saved!");

    const wallet = await new Promise((resolve, reject) => {
        keyStore.ks.keyFromPassword(password, (err, pwDerivedKey) => {
          if (err) {
            reject(err);
          } else {
            const privateKey = keyStore.ks.exportPrivateKey(address, keyStore.pwDerivedKey);
            const wallet = new ethers.Wallet(privateKey, provider);
            resolve(wallet);
          }
        });
    });

	return [wallet, mnemonic];
};

export const LogIn = async (password) => {
    try {
        const encryptedKeystore = await new Promise((resolve) => {
            chrome.storage.local.get('encryptedKeystore', (data) => {
              resolve(data.encryptedKeystore);
            });
        });
        if (!encryptedKeystore) {
            throw new Error('No keystore found in localStorage');
        }
        const bytes = CryptoJS.AES.decrypt(encryptedKeystore, password);
        const decryptedKeystore = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        
        const wallet = await ethers.Wallet.fromEncryptedJson(JSON.stringify(decryptedKeystore), password);
        return wallet;
    } catch (err) {
        console.error(err);
        return null;
    }
};


export const transfer = async (wallet, toAddress, ethAmount) => {
    // 이더 전송
    try {

        const tx = {
            nonce: 0,
            gasLimit: 21000,
            gasPrice: ethers.utils.parseUnits('20', 'gwei'),
            to: toAddress,
            value: ethers.utils.parseEther(ethAmount),
        };

        // 전송할 트랜잭션 객체 생성
        const unsignedTx = await wallet.getTransactionCount().then(nonce => {
            return { ...tx, nonce };
        });

        // 서명된 트랜잭션 생성 및 전송
        const signedTx = await wallet.sign(tx);
        const sentTx = await provider.sendTransaction(signedTx);
        console.log(`Transaction sent: ${sentTx.hash}`);
        return (sentTx.hash);
    } catch (error) {
        console.error(error);
    };
};


export const getAddBalance = async (address) => {
    try {
        const balance = await provider.getBalance(address);
        const result = ethers.utils.formatEther(balance);
        console.log(3,result);
        return result;
      } catch (error) {
        if (error.response) {
          console.log(error.response);
        }
    }
}







