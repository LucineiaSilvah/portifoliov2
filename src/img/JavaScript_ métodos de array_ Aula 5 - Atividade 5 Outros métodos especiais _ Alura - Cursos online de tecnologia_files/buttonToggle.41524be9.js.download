/*
	Easy JS toggle for html buttons.
	
	<button data-js-toggle=".menu">Menu</button>
	<div class="menu"></div>

	.menu.isToggled {}
	.menu:not(.isToggled) {}
	
*/

var gnarus = gnarus || {};
gnarus.buttonToggle = {};

// [Public API] Register toggle events for this DOM subtree
gnarus.buttonToggle.init = function(root) {
	if (root === undefined) root = document;
	
	var elements = root.querySelectorAll('[data-js-toggle]');
	for (var i = 0; i < elements.length; i++) {
		elements[i].addEventListener('click', function(){
			gnarus.buttonToggle.toggle(this);
		});
	}
};

// [Public API] Toggle this specific element
gnarus.buttonToggle.toggle = function(element) {
	var related = element.getAttribute('data-js-toggle');
	element.classList.toggle('isToggled');
	document.querySelector(related).classList.toggle('isToggled');
};

// executa primeira vez no document
gnarus.buttonToggle.init();