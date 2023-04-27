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
                            resolve({ks, pwDerivedKey});
                            console.log("pwDerivedKey",pwDerivedKey);
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

    // 사실은 이 단계에서 wallet 생성 필요 없고 로그인 단계에서 어차피 만듬. 중복인데 일단 테스트용으로 냅둠
    const wallet = await new Promise((resolve, reject) => {
        keyStore.ks.keyFromPassword(password, (err, pwDerivedKey) => {
          if (err) {
            reject(err);
          } else {
            const privateKey = keyStore.ks.exportPrivateKey(address, keyStore.pwDerivedKey);
            const createWallet = new ethers.Wallet(privateKey, provider);
            console.log(address, privateKey);
            console.log(wallet);
            resolve(wallet);
          }
        });
    });

	return [wallet, mnemonic];
};

export const LogIn = async (password) => {
    console.log("login api!")
    try {
        const encryptedKeystore = await new Promise((resolve) => {
            chrome.storage.local.get('encryptedKeystore', (data) => {
              resolve(data.encryptedKeystore);
            });
        });
        if (!encryptedKeystore) {
            throw new Error('No keystore found in localStorage');
        };
        const address = await new Promise((resolve) => {
            chrome.storage.local.get('address', (data) => {
              resolve(data.address);
            });
        });
        if (!address) {
            throw new Error('No address found in localStorage');
        };
        const decryptedKeystoreBytes = CryptoJS.AES.decrypt(encryptedKeystore, password);
        const decryptedKeystoreJson = decryptedKeystoreBytes.toString(CryptoJS.enc.Utf8);
        const keyStore = lightwallet.keystore.deserialize(decryptedKeystoreJson);
        console.log(password);
        const wallet = await new Promise((resolve, reject) => {
            keyStore.keyFromPassword(password, (err, pwDerivedKey) => {
              if (err) {
                reject(err);
              } else {
                const privateKey = keyStore.exportPrivateKey(address, pwDerivedKey);
                const wallet = new ethers.Wallet(privateKey, provider);
                console.log(address, privateKey);
                console.log(wallet);
                resolve(wallet);
              }
            });
        });
        return wallet;
    } catch (err) {
        console.error(err);
        return null;
    }
};


export const transfer = async (wallet, toAddress, ethAmount) => {
    // 이더 전송
    try {
        const address = await new Promise((resolve) => {
            chrome.storage.local.get('address', (data) => {
              resolve(data.address);
            });
        });
        if (!address) {
            throw new Error('No address found in localStorage');
        };

        const nonce = await provider.getTransactionCount(address);

        const tx = {
            nonce: nonce,
            gasLimit: 21000,
            gasPrice: ethers.utils.parseUnits('250', 'gwei'),
            to: toAddress,
            value: ethers.utils.parseEther(ethAmount),
        };

        // 서명된 트랜잭션 생성 및 전송
        const signedTx = await wallet.sign(tx);
        const sentTx = await provider.sendTransaction(signedTx);
        console.log(`Transaction sent: ${sentTx.hash}`);
        return (sentTx.hash);
    } catch (error) {
        console.error(error);
    };
};

export const signTransaction = async (wallet, unsignedTx) => {
    try {
        const signedTx = await wallet.sign(unsignedTx);
        
        
        return signedTx;
    } catch (error) {
        console.error(error);
    };
}

export const sendTransaction = async (wallet, unsignedTx) => {
    try {
        const signedTx = await signTransaction(wallet, unsignedTx);

    } catch (error) {
        console.error(error);
    };
}

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







