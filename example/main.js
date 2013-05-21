var UI = require('sioux-ui');
var UIButton = require('sioux-ui-button');
var UINavigation = require('../index.js');

window.onload = function () {
	document.querySelector('body', function () {
		document.querySelector('div[data-navigation="bar-title"]').innerHTML = 'scrrr'
	})


	var states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
	var statesHTML = document.createElement('ul');
	states.map(function (state, ix) {
		var li = document.createElement('li');
		li.innerHTML = state;
		statesHTML.appendChild(li.cloneNode(true));
	});
	var stateNav = {
		title: 'States'
		, content: statesHTML
		, complete: function (content) {
			var lis = content.querySelectorAll('li');
			for (var i = 0; i < capitals.length; ++i) {
				(function (ix) {
					var li = new UI(lis[ix]);
					li.on('tap', function () {
						nav.push(stateNavs[ix]);
					});
				})(i);
			}
		}
	};

	var capitals = ['Montgomery', 'Juneau', 'Phoenix', 'Little Rock', 'Sacramento', 'Denver', 'Hartford', 'Dover', 'Tallahassee', 'Atlanta', 'Honolulu', 'Boise', 'Springfield', 'Indianapolis', 'Des Moines', 'Topeka', 'Frankfort', 'Baton Rouge', 'Augusta', 'Annapolis', 'Boston', 'Lansing', 'St. Paul', 'Jackson', 'Jefferson City', 'Helena', 'Lincoln', 'Carson City', 'Concord', 'Trenton', 'Santa Fe', 'Albany', 'Raleigh', 'Bismarck', 'Columbus', 'Oklahoma City', 'Salem', 'Harrisburg', 'Providence', 'Columbia', 'Pierre', 'Nashville', 'Austin', 'Salt Lake City', 'Montpelier', 'Richmond', 'Olympia', 'Charleston', 'Madison', 'Cheyenne']; 
	var stateNavs = capitals.map(function (capital, ix) {
		var capitalHTML = document.createElement('ul');
		capitalHTML.innerHTML = '<li>' + capital + '</li>';
		return {
			title: states[ix]
			, content: capitalHTML
			, complete: function (content) {
				console.log('Completed!');
			}
		};
	});

	var ul = document.createElement('ul');
	ul.innerHTML = '<li>United States of America</li>' +
		'<li><button id="h_b">Hide bar!</button><button id="s_b">Show bar!</button></li>'; // +
		//'<li><button id="h_t">Hide toolbar!</button><button id="s_t">Show toolbar!</button></li>';

	var countryNav = {
		title: 'Country'
		, content: ul
		, complete: function (content) {
			var li = new UI(content.querySelector('li'));
			li.on('tap', function () {
				nav.push(stateNav);
			});	
			var hideBar = new UIButton(document.getElementById('h_b'));
			var showBar = new UIButton(document.getElementById('s_b'));
			// var hideToolbar = new UIButton(document.getElementById('h_t'));
			// var showToolbar = new UIButton(document.getElementById('s_t'));
			hideBar.on('tap', function () {
				nav.hideBar();
			});

			showBar.on('tap', function () {
				nav.showBar();
			});

			/*hideToolbar.on('tap', function () {
				nav.hideToolbar();
			});

			showToolbar.on('tap', function () {
				nav.showToolbar();
			});*/
		}
	};

	var nav = new UINavigation(document.querySelector('.screen'), {
		isToolbarHidden: true
		, isBarHidden: false
		, initWith: countryNav
	});
	window.nav = nav;

	// nav.toolbar.innerHTML = '<ul><li>1st</li><li>2nd</li><li>3rd</li><li>4th</li><li>5th</li></ul>';

	var hideBar = new UIButton(document.getElementById('h_b'));
	var showBar = new UIButton(document.getElementById('s_b'));
	// var hideToolbar = new UIButton(document.getElementById('h_t'));
	// var showToolbar = new UIButton(document.getElementById('s_t'));
	hideBar.on('tap', function () {
		nav.hideBar();
	});

	showBar.on('tap', function () {
		nav.showBar();
	});

	/*hideToolbar.on('tap', function () {
		nav.hideToolbar();
	});

	showToolbar.on('tap', function () {
		nav.showToolbar();
	});*/
};