let link = document.getElementById('convertButton')
let clear = document.getElementById('clearButton')
chrome.storage.sync.get(['userText'], function(result) {
	document.getElementById('convertedUrl').textContent = result.userText

});

//function to convert mobile link to web link
link.onclick = function() {
	let defaultLink = "https://item.taobao.com/item.htm?id="
	//document.getElementById('link').value = 'works'
	document.getElementById('convertedUrl').textContent = defaultLink;

	chrome.storage.sync.set({userText: document.getElementById('convertedUrl').textContent}, function() {
          
    });

	//use textContent to change text
}

clear.onclick = function() {
	chrome.storage.sync.remove(['userText'], function() {
		document.getElementById("convertedUrl").textContent = ""
		document.getElementById("link").value = ""
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