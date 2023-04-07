const lightwallet = require("eth-lightwallet");
const CryptoJS = require('crypto-js');

export const createAccount = async (password) => {
    const seed = await lightwallet.keystore.generateRandomSeed();
    const keyStore = await new Promise((resolve, reject) => {
        lightwallet.keystore.createVault(
            {
                password: password,
                seedPhrase: seed,
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
                            resolve(ks);
                        }
                    });
                }
            }
        );
    });

    // 키스토어를 암호화합니다. 최초 생성시 키스토어 암호화는 password로 함.
    const secretKey = password;
    const encryptedKeystore = CryptoJS.AES.encrypt(JSON.stringify(keyStore), secretKey).toString();
    localStorage.setItem('encryptedKeystore', encryptedKeystore);

    return keyStore.getAddresses()[0];
}

export const decryptKeystore = async (password) => {
    try {
        const userKeystore = await localStorage.getItem('encryptedKeystore');
        if (!userKeystore) {
            throw new Error('No keystore found in localStorage');
        }
        const decryptedKeystoreBytes = await CryptoJS.AES.decrypt(userKeystore, password);
        const decryptedKeystoreJson = await decryptedKeystoreBytes.toString(CryptoJS.enc.Utf8);
        const keystore = lightwallet.keystore.deserialize(decryptedKeystoreJson);
        console.log(JSON.stringify(keystore));
        return keystore;
    } catch (err) {
        console.error(err);
        return null;
    }
}