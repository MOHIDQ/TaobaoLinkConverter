let convertLink = document.getElementById('convertButton')
let clear = document.getElementById('clearButton')
//getting the converted links that were stored in the bundle for when the extensions closed and reopens
chrome.storage.sync.get(['userText'], function(result) {
	console.log(result)
	let mainDiv = document.getElementById("newLinks")
	if(result.userText !== undefined) {
		for(let i = 0; i < result.userText.length; i++) {
			let line_break = document.createElement("BR")
			let link = document.createElement("a")
			link.href = result.userText[i]
			link.textContent = result.userText[i]
			link.className = "btn btn-link"
			link.id = "link_" + i
			link.addEventListener("click", function() {
				chrome.tabs.create({active: true, url: link.textContent});
			})

			mainDiv.appendChild(link)
			mainDiv.appendChild(line_break)
		}
	}
	//document.getElementById('convertedUrl').textContent = result.userText

});

function clearLinkDiv() {
	let linkDivChild = document.getElementById("newLinks").children
	let childArr = []
	let len = linkDivChild.length
	for(let i = 0; i < len; i++) {
		childArr.push(linkDivChild[i])
	}
	for(let i = 0; i < len; i++) {
		childArr[i].remove()
	}
}

//function to convert mobile link to web link
convertLink.onclick = function() {
	let defaultLink = "https://item.taobao.com/item.htm?id="
	let arrayLink = document.getElementById('linkArea').value.split(",")
	let id = "";
	let validLinks = []

	let mainDiv = document.getElementById("newLinks")
	clearLinkDiv()
	

	chrome.storage.sync.remove(['userText'], function() {
		document.getElementById("linkArea").value = ""
	})

	//checking each of  the links to see if valid or not
	for(let i = 0; i < arrayLink.length; i++) {
		if(!arrayLink[i].includes("id=")) {
			let line_break = document.createElement("BR")
			let newLink = document.createElement("a")
			newLink.className = "btn btn-link text-danger"
			newLink.innerText = arrayLink[i]
			mainDiv.appendChild(newLink)
			mainDiv.appendChild(line_break)
		}
		else {														
			
			let index = arrayLink[i].indexOf("id=") + 3
			id = arrayLink[i].substring(index, index + 12)
			let line_break = document.createElement("BR")

			let link = document.createElement("a")
			link.href = defaultLink + id
			link.textContent = defaultLink + id
			link.className = "btn btn-link"
			link.id = "link_" + i
			link.addEventListener("click", function() {
				chrome.tabs.create({active: true, url: link.textContent});
			})
 
			mainDiv.appendChild(link)
			mainDiv.appendChild(line_break)

			validLinks.push(defaultLink + id)
		}

	}

	console.log(validLinks)

	chrome.storage.sync.set({userText: validLinks}, function() {
          
    });
}

//when clear button id clicked
clear.onclick = function() {
	chrome.storage.sync.remove(['userText'], function() {
		document.getElementById("linkArea").value = ""

	})
	clearLinkDiv()
}
//MAKE FUNCTIONAILITY WHERE IT SAVES EVERY SINGLE LINK CONVERTED AND A BUTTON TO LIST THEM ALL OR DELETE THEM ALL
//https://world.taobao.com/item/547456053621.htm?fromSite=main
