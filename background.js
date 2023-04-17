chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ brightness: 100 });
  });
  
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "setBrightness") {
      const brightness = message.value;
      chrome.storage.sync.set({ brightness });
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { type: "setBrightness", value: brightness });
      });
    }
  });
  
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete") {
      chrome.storage.sync.get("brightness", (data) => {
        const brightness = data.brightness;
        chrome.tabs.sendMessage(tabId, { type: "setBrightness", value: brightness });
      });
    }
  });