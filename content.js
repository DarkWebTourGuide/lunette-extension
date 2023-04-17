// content.js
const style = document.createElement("style");
document.head.append(style);

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "setBrightness") {
    const brightness = message.value;
    style.textContent = `
      html {
        filter: brightness(${brightness}%);
      }
    `;
  }
});