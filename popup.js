let link = document.getElementById('convertButton')
let clear = document.getElementById('clearButton')
chrome.storage.sync.get(['userText'], function(result) {

	document.getElementById('convertedUrl').textContent = result.userText

});

//function to convert mobile link to web link
link.onclick = function() {
	let defaultLink = "https://item.taobao.com/item.htm?id="
	let arrayLink = document.getElementById('link').value.split(",")
	let preURL = document.getElementById('link').value
	let id = "";

	console.log(arrayLink)

	//if link entered does not contain an id query
	if(!preURL.includes("id=")) {
		document.getElementById('errorMessage').textContent = "Enter Valid Link"
	}
	else {
		document.getElementById('errorMessage').textContent = ""

		let index = preURL.indexOf("id=") + 3
		id = preURL.substring(index, index + 12)
		document.getElementById('convertedUrl').textContent = defaultLink + id;
	}

	document.getElementById('link').value = ''
	//document.getElementById('convertedUrl').textContent = defaultLink;
	//document.getElementById('linkTab').innerHTML += `<h2 name = "cl">${10}</h2>`;
	chrome.storage.sync.set({userText: document.getElementById('convertedUrl').textContent}, function() {
          
    });

	//use textContent to change text
}

//when clear button id clicked
clear.onclick = function() {
	chrome.storage.sync.remove(['userText'], function() {
		document.getElementById("convertedUrl").textContent = ""
		document.getElementById("link").value = ""
		document.getElementById("errorMessage").textContent = ""
	})
}

//open links
document.addEventListener('DOMContentLoaded', function() {
   let openTab = document.getElementById("linkTab");
   //simpler version instrad of using callback/async method
   openTab.onclick = function() {
   		chrome.tabs.create({active: true, url: openTab.textContent});
   }

   //y.addEventListener("click", function() {
   	//	chrome.tabs.create({active: true, url: y.textContent});
   //});
})

function openIndex() {
 chrome.tabs.create({active: true, url: control.textContent});
}