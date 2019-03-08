chrome.commands.onCommand.addListener(function(command) {
	console.log('onCommand event received for message: ', command);
});
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	let response = "";
	if (request.type == "add_true") {
		chrome.storage.local.get(['users'], function(result) {


			// console.log(request.person);
			let xhr = new XMLHttpRequest();
			// xhr.onreadystatechange = handleStateChange; // Implemented elsewhere.
			xhr.open("POST", 'http://localhost/add', true);
			xhr.setRequestHeader('Content-Type', 'application/json');
			xhr.send(JSON.stringify(request.person));

			/*console.log(typeof(result.users), result.users);
			console.log(result.users.push(request.person));
			chrome.storage.local.set({'users': result.users}, () => {

				response = "Adding";
			});*/
		});
	}
	if (request.type == "clear"){
		chrome.storage.local.set({'users': []}, () => {
			response = "Adding";
		});
	}
	sendResponse(response);
});