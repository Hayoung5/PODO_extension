/*global chrome*/

const handleMetaMaskEvent = (event) => {
    if (event.data && event.data.data && event.data.data.data && event.data.data.data.method) {
        if (event.data.data.data.method === 'eth_sendTransaction') {
            console.log("send msg");
            chrome.storage.local.set({ msg: event.data.data.data });
            console.log(event.data.data.data);
            chrome.storage.local.set({ location : window.location.origin});

            chrome.runtime.sendMessage({ action: 'openPopup' });
        }
    }
}

window.addEventListener('message', handleMetaMaskEvent);