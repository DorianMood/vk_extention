let ENABLE_ADDING = true;
var buttonsFriendsList = [];
var friewnsRows = [];

let ADD_TO_CART = '<button class=\"flat_button button_wide add-to-cart\">Добавить в корзину</button>';
let BUTTON = `<div class=\"page_actions_wide clear_fix\">  <div class=\"page_action_left fl_l\" id=\"friend_status\">    <div class=\"profile_action_btn\">${ADD_TO_CART}</div>  </div></div>`;


function processAdding(e, row) {
	let person = null;
	if (window.location.href.includes('photo')) {
		person = {
			link: $(row.children()[1]).children().first().children().first()[0].href,
			name: $(row.children()[1]).children().first().children().first()[0].innerText
		}
	} else if (window.location.href.includes('group')) {
		person = {
			link: row.find('.name').children().first()[0]['href'],
			name: row.find('.name').children().first()[0].innerText
		};
	} else {
		person = {
			link: row.find('.friends_field_title').children().last()[0]['href'],
			name: row.find('.friends_field_title').children().last()[0].innerText
		};
	}
	console.log(person);
	chrome.extension.sendMessage({type: "add_true", person: person}, (response) => {
		console.log(`Response on method add_true : ${response}`);
	});
	$(e.target).addClass('secondary').css('pointer-events', 'none');
}

function processFriendsSingleBlock(element) {
	let childs = element.children();

	childs.each((i) => {
		let newRow = $(childs[i]);
		if (!newRow.hasClass('has-button')) {
			newRow.addClass('has-button');
			newRow.children().last().after(BUTTON);
			let insertedButton = newRow.children().last().children().last();
			insertedButton.on('click', (e) => processAdding(e, newRow));
		}
	});
}

function processGroupSearchSingleRow(row) {
	if (row.hasClass('search_row') && !row.hasClass('has-button')) {
		row.addClass('has-button');
		row.children().last().after(BUTTON);
		let insertedButton = row.children().last().children().last();
		insertedButton.on('click', (e) => processAdding(e, row));
	}
}


$(document).ready(() => {


	/*
	Добавление кнопки в список друзей
	*/
	$('#list_content').children().each((i) => {
		processFriendsSingleBlock($($('#list_content').children().first()));
	})

	$('#list_content').on('DOMNodeInserted', (e) => {
		let element = $(e.target);

		if (element.hasClass('friends_list_bl'))
			processFriendsSingleBlock(element);
	});

	/*
	Добавление кнопки в поиск по группе
	*/
	$('#results').children().each((i) => {
		processGroupSearchSingleRow($($('#results').children()[i]));
	})

	$('#results').on('DOMNodeInserted', (e) => {
		processGroupSearchSingleRow($(e.target));
	});


	/*
	Добавление кнопки в просмотр фотографий пользователя
	*/
	$('#layer_wrap').on('DOMNodeInserted', (e) => {
		let element = $(e.target);
		if (element.hasClass('pv_author_block')) {
			element.children().last().after(BUTTON);
			let insertedButton = element.children().last();
			insertedButton.on('click', (e) => {
				processAdding(e, element);
			});
		}
	});

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
			$('.add-to-cart').on('click', (e) => {
				console.log('adding');

				let person = {
					link: window.location.href,
					name: $(".page_name")[0].innerText
				};
				chrome.extension.sendMessage({type: "add_true", person: person}, (response) => {
					console.log(`Response on method add_true : ${response}`);
				});

				/*$('.add-to-cart')*/$(e.target).addClass('secondary').css('pointer-events', 'none');
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
