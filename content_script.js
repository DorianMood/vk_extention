let ENABLE_ADDING = true;

$(document).ready(() => {


	/*
	Обработка списка друзей
	*/
	// console.log($('.friends_list_bl').children().css('background-color', 'red'));



	/*
	Добавление кнопки добавить в корзину.
	Работа с событиями для коррректной работы этой кнопки.
	*/
	if ($('.add-to-cart').length === 0 && $('#page_block_group_main_info').length === 0) {
		$('.page_actions_wide').after('<div class=\"page_actions_wide clear_fix\">  <div class=\"page_action_left fl_l\" id=\"friend_status\">    <div class=\"profile_action_btn\"><button class=\"flat_button button_wide add-to-cart\">Добавить в корзину</button></div>  </div></div>');
			// $('.profile_actions_wide').after('<div class=\"page_actions_wide clear_fix\">  <div class=\"page_action_left fl_l\" id=\"friend_status\">    <div class=\"profile_action_btn\"><button class=\"flat_button button_wide\">Добавить в корзину</button></div>  </div></div>');
		ENABLE_ADDING = true;
		$('.add-to-cart').on('click', () => {
			console.log('adding');
			let person = {
				link: window.location.href,
				name: $(".page_name")[0].innerText
			};
			chrome.extension.sendMessage({type: "add_true", person: person}, (response) => {
				console.log(`Response on method add_true : ${response}`);
			});
			$('.add-to-cart').addClass('secondary').css('pointer-events', 'none');
			ENABLE_ADDING = false;
		});
	}

	$('.page_name').on('DOMSubtreeModified', () => {
		console.log('123');
	});

	$('#utils').on('DOMSubtreeModified', () => {
		if ($('.add-to-cart').length === 0 && $('#page_block_group_main_info').length === 0) {
			$('.page_actions_wide').after('<div class=\"page_actions_wide clear_fix\">  <div class=\"page_action_left fl_l\" id=\"friend_status\">    <div class=\"profile_action_btn\"><button class=\"flat_button button_wide add-to-cart\">Добавить в корзину</button></div>  </div></div>');
			// $('.profile_actions_wide').after('<div class=\"page_actions_wide clear_fix\">  <div class=\"page_action_left fl_l\" id=\"friend_status\">    <div class=\"profile_action_btn\"><button class=\"flat_button button_wide\">Добавить в корзину</button></div>  </div></div>');
			ENABLE_ADDING = true;
			$('.add-to-cart').on('click', () => {
				console.log('adding');

				let person = {
					link: window.location.href,
					name: $(".page_name")[0].innerText
				};
				chrome.extension.sendMessage({type: "add_true", person: person}, (response) => {
					console.log(`Response on method add_true : ${response}`);
				});

				$('.add-to-cart').addClass('secondary').css('pointer-events', 'none');
				ENABLE_ADDING = false;
			});
		}
	});


	/*
	Обработка событий горячих клавиш.
	*/
		$(document).keydown((e) => {
			if (e.ctrlKey && String.fromCharCode(e.which).toLowerCase() === 'e') {
				e.preventDefault();
			}
			if ($('.page_name').length > 0) {
				if (e.ctrlKey && String.fromCharCode(e.which).toLowerCase() === 'e' && ENABLE_ADDING) {
					e.preventDefault();

					let person = {
						link: window.location.href,
						name: $(".page_name")[0].innerText
					};
					chrome.extension.sendMessage({type: "add_true", person: person}, (response) => {
						console.log(`Response on method add_true : ${response}`);
					});
					chrome.storage.local.get(function(result){console.log(result)});
					$('.add-to-cart').addClass('secondary').css('pointer-events', 'none');
					ENABLE_ADDING = false;
				}
				if (e.ctrlKey && String.fromCharCode(e.which).toLowerCase() === 'q') {
					e.preventDefault();
					let person = {
						link: window.location.href,
						name: $(".page_name")[0].innerText
					};
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
			} else if ($('._im_page_peer_name').length > 0) {
				if (e.ctrlKey && String.fromCharCode(e.which).toLowerCase() === 'e' && ENABLE_ADDING) {
					e.preventDefault();

					let person = {
						link: $("._im_page_peer_name")[0].href,
						name: $("._im_page_peer_name")[0].innerText
					};
					chrome.extension.sendMessage({type: "add_true", person: person}, (response) => {
						console.log(`Response on method add_true : ${response}`);
					});
					chrome.storage.local.get(function(result){console.log(result)});
					$('.add-to-cart').addClass('secondary').css('pointer-events', 'none');
					ENABLE_ADDING = false;
				}
				if (e.ctrlKey && String.fromCharCode(e.which).toLowerCase() === 'q') {
					e.preventDefault();
					let person = {
						name: $("._im_page_peer_name")[0].href,
						link: $("._im_page_peer_name")[0].innerText
					};
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
			}
		});
	});
