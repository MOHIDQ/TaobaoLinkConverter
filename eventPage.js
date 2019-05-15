//defining context menu properties
let contextMenuItem = {
	"id": "Tlink",
	"title": "Go To New URL",
	"contexts": ["selection"]
}

function convertLink(preUrl) {
	let newURL = preUrl.replace(/\s/g, '')
	return newURL
}

function goToLink(preUrl) {
	//let newURL = convertLink(preUrl)
  	chrome.tabs.create({ url: convertLink(preUrl) })
  	//return newURL
}

chrome.contextMenus.create(contextMenuItem);

chrome.contextMenus.onClicked.addListener(function(clickData) {
	if(clickData.menuItemId === "Tlink" && clickData.selectionText) {
		goToLink(clickData.selectionText)
	}
}) 