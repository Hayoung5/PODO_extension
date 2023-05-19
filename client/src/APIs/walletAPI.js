/*global chrome*/
import { MetaMaskInpageProvider } from '@metamask/inpage-provider';
import PortStream from 'extension-port-stream';

export const getAddData = async () => {
    let provider
    console.log(process.env.REACT_APP_METAMASKID);
    try {
        const metamaskPort = chrome.runtime.connect(process.env.REACT_APP_METAMASKID);
        const pluginStream = new PortStream(metamaskPort);
        provider = new MetaMaskInpageProvider(pluginStream);
    } catch (e) {
        console.dir(`Metamask connect error `, e);
        throw e
    }
    const address = await provider.request({method: 'eth_requestAccounts'})
    // const balance = await getAddBalance(address);
    return address;
}
