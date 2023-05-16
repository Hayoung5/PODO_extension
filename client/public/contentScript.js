/*global chrome*/

const handleMetaMaskEvent = (event) => {
    chrome.runtime.sendMessage({ action: 'openPopup' });
    // if(event.data.data.data.method === 'eth_sendTransaction'){
    //     chrome.storage.local.set({msg: event.data});
    //     console.log("updated!");
    //     console.log(event.data.data.data);
    //     // 메시지 전송하여 팝업 열기
    //     chrome.runtime.sendMessage({ action: 'openPopup' });
    // }
}

window.addEventListener('message', handleMetaMaskEvent);