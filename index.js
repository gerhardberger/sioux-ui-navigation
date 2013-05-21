var inherits = require('inherits');
var events = require('events');
var fs = require('fs');
var insertCss = require('insert-css');
var UISegue = require('sioux-ui-segue');
var UI = require('sioux-ui');
var UIButton = require('sioux-ui-button');

var html = fs.readFileSync(__dirname + '/struct.html');
var css = fs.readFileSync(__dirname + '/style.css');
insertCss(css);

function setupNavigationWindow(o, elem, bar) {
	elem.innerHTML = '';
	elem.appendChild(o.content.cloneNode(true));

	bar.querySelector('div[data-navigation="bar-title"]').innerHTML = o.title;

	o.complete(elem);
}

function setContentHeight(height, self) {
	self.navContent.style.height = height;
	self.segue.active.style.height = height;
	self.segue.left.style.height = height;
	self.segue.right.style.height = height;
}

function Navigation (element, options) {
	if (!options) options = {};
	var self = this;
	self.element = element;
	self.stack = [];
	self.isToolbarHidden = options.isToolbarHidden;
	self.isBarHidden = options.isBarHidden;
	self._callback = undefined;

	element.innerHTML += html;

	self.bar = element.querySelector('div[data-navigation="bar"]');
	self.navContent = element.querySelector('div[data-navigation="content"]');
	self.toolbar = element.querySelector('div[data-navigation="toolbar"]');

	// Setting up the segue in content area
	self.segue = new UISegue('push', self.navContent);
	self.content = self.segue.active;

	if (self.isBarHidden) {
		self.bar.style.display = 'none';

		var newHeight = self.isToolbarHidden ? '100%' : '92%';
		setContentHeight(newHeight, self);
	}
	if (self.isToolbarHidden) {
		self.toolbar.style.display = 'none';

		var newHeight = self.isBarHidden ? '100%' : '92%';
		setContentHeight(newHeight, self);
	}
	if (!self.isBarHidden && !self.isToolbarHidden) {
		self.navContent.style.height = '84%';
	}

	// Initalizing with the first elem of the stack
	self.stack.push(options.initWith);
	setupNavigationWindow(options.initWith, self.content, self.bar);

	self.back = new UIButton(self.bar.querySelector('div[data-navigation="bar-back"] button'));
	self.back.on('tap', function () {
		self.pop();
	});
}

inherits(Navigation, UI);

Navigation.prototype.push = function (o) {
	if (!o) return;
	var self = this;

	self.stack.push(o);
	if (self.stack.length === 2) self.back.element.style.opacity = '1';

	setupNavigationWindow(o, self.segue.right, self.bar);

	self.content = self.segue.right;
	self.segue.wind();
};

Navigation.prototype.pop = function () {
	var self = this;

	if (self.stack.length === 1) return;

	self.stack.pop();
	if (self.stack.length === 1) self.back.element.style.opacity = '0';
	var o = self.stack[self.stack.length - 1];

	setupNavigationWindow(o, self.segue.left, self.bar);

	self.content = self.segue.left;
	self.segue.unwind();
};

Navigation.prototype.hideBar = function() {
	var self = this;
	if (self.isBarHidden) return;

	var handler = function () {
		self.isBarHidden = true;

		setContentHeight((parseInt(self.navContent.style.height, 10) + 8) + '%', self);
		this.style.display = 'none';
		this.removeEventListener('webkitTransitionEnd', handler, false);
		
		if (this._callback) this._callback(this);
		this._callback = undefined;
	};

	self.bar.style.webkitTransform = 'translate3d(0, -100%, 0)';
	self.bar.addEventListener('webkitTransitionEnd', handler, false);

	return this;
};

Navigation.prototype.hideToolbar = function() {
	var self = this;
	if (self.isToolbarHidden) return;

	var handler = function () {
		self.isToolbarHidden = true;

		setContentHeight((parseInt(self.navContent.style.height, 10) + 8) + '%', self);
		this.style.display = 'none';
		this.removeEventListener('webkitTransitionEnd', handler, false);

		if (this._callback) this._callback(this);
		this._callback = undefined;
	};

	self.toolbar.style.webkitTransform = 'translate3d(0, 100%, 0)';
	self.toolbar.addEventListener('webkitTransitionEnd', handler, false);

	return this;
};

Navigation.prototype.showBar = function() {
	var self = this;
	if (!self.isBarHidden) return;
		
	var handler = function () {
		self.isBarHidden = false;

		setContentHeight((parseInt(self.navContent.style.height, 10) - 8) + '%', self);
		this.removeEventListener('webkitTransitionEnd', handler, false);

		if (this._callback) this._callback(this);
		this._callback = undefined;
	};
	self.bar.style.display = 'table';
	setTimeout(function() { self.bar.style.webkitTransform = 'translate3d(0, 0, 0)'; }, 10);
	self.bar.addEventListener('webkitTransitionEnd', handler, false);

	return this;
};

Navigation.prototype.showToolbar = function() {
	var self = this;
	if (!self.isToolbarHidden) return;

	var handler = function () {
		self.isToolbarHidden = false;

		this.removeEventListener('webkitTransitionEnd', handler, false);

		if (this._callback) this._callback(this);
		this._callback = undefined;
	};
	self.toolbar.style.display = 'block';
	setContentHeight((parseInt(self.navContent.style.height, 10) - 8) + '%', self); 
	setTimeout(function() { self.toolbar.style.webkitTransform = 'translate3d(0, 0, 0)'; }, 1);
	self.toolbar.addEventListener('webkitTransitionEnd', handler, false);

	return this;
};

Navigation.prototype.then = function (fn) {
	this._callback = fn;

	return this;
};

module.exports = Navigation;