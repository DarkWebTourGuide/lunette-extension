const slider = document.getElementById("slider");

chrome.storage.sync.get("brightness", (data) => {
  const brightness = data.brightness || 100;
  slider.value = brightness;
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { type: "setBrightness", value: brightness });
  });
});

slider.addEventListener("input", (event) => {
  const value = event.target.value;
  chrome.storage.sync.set({ brightness: value });
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { type: "setBrightness", value });
  });
});
