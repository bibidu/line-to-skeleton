// 获取当前选项卡ID
function getCurrentTabId(callback) {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		if(callback) callback(tabs.length ? tabs[0].id: null)
	})
}

export function sendToContentScript(message, callback) {
	getCurrentTabId((tabId) => {
		chrome.tabs.sendMessage(tabId, message, function(response) {
			if(callback) callback(response)
		})
	})
}

export function listenPopup(callback) {
  chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {
      callback({ msg: request, callback: sendResponse })
      return true
    }
  )
}