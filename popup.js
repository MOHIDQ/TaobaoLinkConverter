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

chrome.storage.sync.get(['textArea'], function(result) {
	if(result.textArea !== undefined) {
		console.log(result)
		document.getElementById("linkArea").value = result.textArea
	}
	//document.getElementById('convertedUrl').textContent = result.userText

});

//function that clears the div that contain the converted links
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
	})
	chrome.storage.sync.remove(['textArea'], function() {
	})

	//checking each of  the links to see if valid or not
	for(let i = 0; i < arrayLink.length; i++) {
		if(!arrayLink[i].includes("id=") && !arrayLink[i].includes("item/") && arrayLink[i] !== "") {
			let line_break = document.createElement("BR")
			let newLink = document.createElement("a")
			newLink.className = "btn btn-link text-danger"
			newLink.innerText = arrayLink[i]
			mainDiv.appendChild(newLink)
			mainDiv.appendChild(line_break)
		}
		else if (arrayLink[i].includes("id=")) {														
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
		//example of this condition would be https://world.taobao.com/item/547456053621.htm?fromSite=main
		else if (arrayLink[i].includes("item/")) {
			let index = arrayLink[i].indexOf("item/") + 5
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

	//saves the stored links 
	chrome.storage.sync.set({userText: validLinks}, function() {
        document.getElementById("linkArea").value = ""
    });
}

//when clear button id clicked
clear.onclick = function() {
	chrome.storage.sync.remove(['userText'], function() {
		document.getElementById("linkArea").value = ""

	})
	clearLinkDiv()
}

//saves the text area value if extension pop up is still closed
window.onblur = function(){
	chrome.storage.sync.set({textArea: document.getElementById("linkArea").value}, function() {
    
    });
}




//MAKE FUNCTIONAILITY WHERE IT SAVES EVERY SINGLE LINK CONVERTED AND A BUTTON TO LIST THEM ALL OR DELETE THEM ALL
