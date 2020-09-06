
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

	if(exchangeTo !== "" && exchangeFrom !== "") {
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

	if(exchangeTo !== "" && exchangeFrom !== "") {
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

	if(exchangeTo !== "" && exchangeFrom !== "") {
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
