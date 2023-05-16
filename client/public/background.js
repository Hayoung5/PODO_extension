/*global chrome*/

chrome.runtime.onMessage.addListener(async(message, sender, sendResponse) => {
    console.log(message.action);
    if (message.action === 'openPopup') {
        console.log("pop up!");
        chrome.action.setPopup({popup : "index.html"});

        // chrome.action.openPopup(function() {
        //     console.log('Popup opened');
        // });
        
    }
});