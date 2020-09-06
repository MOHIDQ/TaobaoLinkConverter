let convertLink = document.getElementById('convertButton')
let clear = document.getElementById('clearButton')
let history = document.getElementById('historyButton')
let back = document.getElementById('backButton')
let currency = document.getElementById('currencyButton')
let backCurrency = document.getElementById('backButtonCurrency')

let everyValidLink = []

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
		if(document.getElementById("linkArea").value === "undefined") {
			document.getElementById("linkArea").value = ""
		}
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
		if(!arrayLink[i].includes("id=") && !arrayLink[i].includes("item/") && arrayLink[i] !== "" && !arrayLink[i].includes("id%")) {
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
			everyValidLink.push(defaultLink + id)
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
			everyValidLink.push(defaultLink + id)
		}
		//example of superbuy link would be: https://m . superbuy . com/en/goodsdetail/?url=https%3A%2F%2Fitem . taobao . com%2Fitem . htm%3Fid%3D600967667601
		else if(arrayLink[i].includes("id%")) {
			let index = arrayLink[i].indexOf("id%") + 5 //+ 3 + 2 since we dont need the first two digits
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
			everyValidLink.push(defaultLink + id)

		}
	}
	chrome.storage.sync.get(['allLinks'], function(result) {
		if(result.allLinks !== undefined) {
			console.log(result)
			//document.getElementById("linkArea").value = result.textArea
			let newArr = result.allLinks.concat(validLinks)
			chrome.storage.sync.set({allLinks: newArr}, function() {
				
	    	});
		}
	//document.getElementById('convertedUrl').textContent = result.userText

	});


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

//when the history button is clicked
history.onclick = function() {
	let newArr = []
	chrome.storage.sync.get(null, function(result) {
		//case if the history key for all the links does not exist, then create it
		if(result.allLinks === undefined) {
			chrome.storage.sync.set({allLinks: everyValidLink}, function() {
    
    		});
		}
		//if the key for all links history already exists
		else {
			chrome.storage.sync.get(['allLinks'], function(result) {
		if(result.allLinks !== undefined) {
			newArr = result.allLinks

	    	//removing display for convert links divs
			let convertSection = document.getElementById("linkCovertSection")
			convertSection.style.display = "none"

			//showing the hisory links section
			let historySection = document.getElementById("historySection")
			historySection.style.display = "block"
			//clearing the history links div
			let div = document.getElementById("allLinks")
			while(div.firstChild){
			    div.removeChild(div.firstChild);
			}

			let historyLinkDiv = document.getElementById("allLinks")
			console.log(newArr.length)
			for(let i = 0; i < newArr.length; i++) {
				let line_break = document.createElement("BR")
				let link = document.createElement("a")
				link.href = newArr[i]
				link.textContent = newArr[i]
				link.className = "btn btn-link"
				link.id = "hisLlink_" + i
				link.addEventListener("click", function() {
					chrome.tabs.create({active: true, url: link.textContent});
				})

				historyLinkDiv.appendChild(link)
				historyLinkDiv.appendChild(line_break)
			}
		}

	});
		}
	})

}

//when the back button is clicked on the main page
back.onclick = function() {
	//removing display for convert links divs
	let convertSection = document.getElementById("linkCovertSection")
	convertSection.style.display = "block"

	//showing the hisory links section
	let historySection = document.getElementById("historySection")
	historySection.style.display = "none"
}

//when the currency conversion button is clicked
currency.onclick = function() {
	//removing display for convert links divs
	let convertSection = document.getElementById("linkCovertSection")
	convertSection.style.display = "none"

	//removing the hisory links section
	let historySection = document.getElementById("historySection")
	historySection.style.display = "none"

	//showing the currency converter section
	let currencySection = document.getElementById('currencySection')
	currencySection.style.display = "block"

	convertCurrency()
}

//when the back button on the currency conversion screen is clicked
backCurrency.onclick = function() {
	//showing the currency converter section
	let currencySection = document.getElementById('currencySection')
	currencySection.style.display = "none"

	//removing display for convert links divs
	let convertSection = document.getElementById("linkCovertSection")
	convertSection.style.display = "block"	


}

function convertCurrency(base, inputType) {
	//fetches currency conversion against base currency
	fetch(`https://api.exchangeratesapi.io/latest?base=${base}`)
	  .then(
	    function(response) {
	      if (response.status !== 200) {
	        console.log('Looks like there was a problem. Status Code: ' +
	          response.status);
	        return;
	      }

	      // Examine the text in the response
	      response.json().then(function(data) {
	        //console.log(data);
	        exchangeRate = data
	        if(inputType === 1) {
	        	currencyOneChange()
	        }
	        else if (inputType === 2) {
	        	currencyTwoChange()
	        }
	      });
	    }
	  )
	  .catch(function(err) {
	    console.log('Fetch Error :-S', err);
	  });
}

//event listener for the first amount
//document.getElementById("amount1").addEventListener("input", function() {
	//document.getElementById("amount2").value = document.getElementById("amount1").value
//})

//event listener for when choosing a currency from the drop down
document.getElementById("currency1").addEventListener("change", function() {
	//if the selected option is the default value
	if(document.getElementById("currency1").options[document.getElementById("currency1").selectedIndex].value === "") {
		document.getElementById("amount1").value = 0
		document.getElementById("conversion").innerHTML = ""
	}
	else {
		convertCurrency(document.getElementById("currency1").options[document.getElementById("currency1").selectedIndex].value, 1)

	}
})

document.getElementById("currency2").addEventListener("change", function() {
	convertCurrency(document.getElementById("currency1").options[document.getElementById("currency1").selectedIndex].value, 2)
})


//function when the currency drop down 1 changes
function currencyOneChange() {
	let exchangeTo = document.getElementById("currency2").options[document.getElementById("currency2").selectedIndex].value
	let exchangeFrom = document.getElementById("currency1").options[document.getElementById("currency1").selectedIndex].value

	if(exchangeTo !== "") {
		if(exchangeTo === exchangeFrom) {
			document.getElementById("conversion").innerHTML = "= $" + document.getElementById("amount1").value

		}
		else {
			document.getElementById("conversion").innerHTML = "= $" + numberWithCommas((document.getElementById("amount1").value * exchangeRate.rates[exchangeTo]).toFixed(2))
			console.log(exchangeRate)
		}
	}
}

//function when the currency drop down 2 changes
function currencyTwoChange() {
	let exchangeTo = document.getElementById("currency2").options[document.getElementById("currency2").selectedIndex].value
	let exchangeFrom = document.getElementById("currency1").options[document.getElementById("currency1").selectedIndex].value

	if(exchangeTo !== "") {
		if(exchangeTo === exchangeFrom) {
			document.getElementById("conversion").innerHTML = "= $" + document.getElementById("amount1").value

		}
		else {
			document.getElementById("conversion").innerHTML = "= $" + numberWithCommas((document.getElementById("amount1").value * exchangeRate.rates[exchangeTo]).toFixed(2))
			console.log(exchangeRate)
		}
	}
} 


document.getElementById("amount1").addEventListener("input", function() {
	let exchangeTo = document.getElementById("currency2").options[document.getElementById("currency2").selectedIndex].value
	let exchangeFrom = document.getElementById("currency1").options[document.getElementById("currency1").selectedIndex].value

	if(exchangeTo !== "") {
		if(exchangeTo === exchangeFrom) {
			document.getElementById("conversion").innerHTML = "= $" + document.getElementById("amount1").value

		}
		else {
			document.getElementById("conversion").innerHTML = "= $" + numberWithCommas((document.getElementById("amount1").value * exchangeRate.rates[exchangeTo]).toFixed(2))
			console.log(exchangeRate)
		}
	}
})


//function that returns comma sepearted large numbers
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}





//saves the text area value if extension pop up is still closed
window.onblur = function(){
	console.log(document.getElementById("linkArea").value)
	chrome.storage.sync.set({textArea: document.getElementById("linkArea").value}, function() {
    	
    });
    chrome.storage.sync.get(['allLinks'], function(result) {
		if(result.allLinks !== undefined) {
			console.log(result)
			//document.getElementById("linkArea").value = result.textArea
			let newArr = result.allLinks.concat(everyValidLink)
			chrome.storage.sync.set({allLinks: newArr}, function() {

	    	});
		}
	//document.getElementById('convertedUrl').textContent = result.userText

	});
}

