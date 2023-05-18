/*global chrome*/

chrome.runtime.onMessage.addListener(async(message, sender, sendResponse) => {
    console.log(message.action);
    if (message.action === 'openPopup') {
        console.log("pop up!");

        // chrome.tabs.create({ url: chrome.runtime.getURL('index.html') });

        // chrome.action.setPopup({popup : "popup.html"}).then(console.log("!!!"));

        // chrome.action.openPopup(function() {
        //     console.log('Popup opened');
        // });
    
        const newWindow = () => {
            console.log('in new window function');
        };
        chrome.windows.create(
            {
            url: 'index.html',
            type: 'panel',
            width: 375,
            height: 544,
            left: 500,
            top: 50,
            },
            newWindow
        );
      
    }
});