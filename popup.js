let convertLink = document.getElementById('convertButton')
let clear = document.getElementById('clearButton')
//getting the converted links that were stored in the bundle for when the extensions closed and reopens
chrome.storage.sync.get(['userText'], function(result) {
	console.log(result)
	let mainDiv = document.getElementById("newLinks")
	for(let i = 0; i < result.userText.length; i++) {
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
	//document.getElementById('convertedUrl').textContent = result.userText

});

//function to convert mobile link to web link
convertLink.onclick = function() {
	let defaultLink = "https://item.taobao.com/item.htm?id="
	let arrayLink = document.getElementById('link').value.split(",")
	let preURL = document.getElementById('link').value
	let id = "";
	let validLinks = []

	let mainDiv = document.getElementById("newLinks")
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

	console.log(arrayLink)

	chrome.storage.sync.set({userText: validLinks}, function() {
          
    });
}

//when clear button id clicked
clear.onclick = function() {
	chrome.storage.sync.remove(['userText'], function() {
		document.getElementById("link").value = ""
		document.getElementById("errorMessage").textContent = ""

		let linkDivChild = document.getElementById("newLinks").children
		for(let i = 0; i < linkDivChild.length; i++) {
			linkDivChild[i].remove()
		}
	})
}

//https://world.taobao.com/item/547456053621.htm?fromSite=main
