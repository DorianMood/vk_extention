console.log("hello!");

$(document).ready(() => {
	chrome.storage.local.get(function(result){console.log(result)});
	$(document).keydown((e) => {
		if (e.ctrlKey && String.fromCharCode(e.which).toLowerCase() === 'e') {
			e.preventDefault();
			console.log("Good");
			let person = {
				name: $("._im_page_peer_name")[0].href,
				link: $("._im_page_peer_name")[0].innerText
			};
			chrome.extension.sendMessage({type: "add_true", person: person}, (response) => {
				console.log(`Response on method add_true : ${response}`);
			});
			console.log(person);
			chrome.storage.local.get(function(result){console.log(result)});
		}
		if (e.ctrlKey && String.fromCharCode(e.which).toLowerCase() === 'q') {
			e.preventDefault();
			console.log("Bad");
			let person = {
				name: $("._im_page_peer_name")[0].href,
				link: $("._im_page_peer_name")[0].innerText
			};
			console.log(person);
			chrome.extension.sendMessage({type: "add_not_true", person: person}, (response) => {
				console.log(response);
			});
			chrome.storage.local.get(function(result){console.log(result)});
		}
		if (e.ctrlKey && String.fromCharCode(e.which).toLowerCase() === 'd') {
			e.preventDefault();
			chrome.extension.sendMessage({type: "clear"}, (response) => {
				console.log(response)
			});

			chrome.storage.local.get(function(result){console.log(result)});
		}
	});
})