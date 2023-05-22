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
            // windowId = createdWindow.id;
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

// chrome.windows.onRemoved 이벤트 리스너 등록
chrome.windows.onRemoved.addListener(() => {
    // 데이터 삭제 작업 수행
    chrome.storage.local.remove("msg", () => {
        console.log("msg 데이터가 삭제되었습니다.");
    });
    chrome.storage.local.remove("location", () => {
        console.log("location 데이터가 삭제되었습니다.");
    });
});
  