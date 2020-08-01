//defining context menu properties
let contextMenuItem = {
	"id": "Tlink",
	"title": "Go to " + "%s",
	"contexts": ["selection"]
}

function convertLink(preUrl) {
	let newURL = preUrl.replace(/\s/g, '')
	return newURL
}

function goToLink(preUrl) {
	let defaultLink = "https://item.taobao.com/item.htm?id="
	let id = ""
	//regular taobao link
	if (preUrl.includes("id=")) {
		let index = preUrl.indexOf("id=") + 3
		id = preUrl.substring(index, index + 12)
		chrome.tabs.create({ url: convertLink(defaultLink + id) })
	}
	//world taobao links
	else if (preUrl.includes("item/")) {
		let index = preUrl.indexOf("item/") + 5
		id = preUrl.substring(index, index + 12)
		chrome.tabs.create({ url: convertLink(defaultLink + id) })
	}
	//superbuy links
	else if(preUrl.includes("id%")) {
		let index = preUrl.indexOf("id%") + 5 //+ 3 + 2 since we dont need the first two digits
		id = preUrl.substring(index, index + 12)
		chrome.tabs.create({ url: convertLink(defaultLink + id) })
	}

}

chrome.contextMenus.create(contextMenuItem);

chrome.contextMenus.onClicked.addListener(function(clickData) {
	if(clickData.menuItemId === "Tlink" && clickData.selectionText) {
		goToLink(clickData.selectionText)
	}
}) 