/*! Salt.js DOM Selector Lib. By @james2doyle */
/* https://github.com/james2doyle/saltjs */
/* (The MIT License)  Copyright (c) 2015 James Doyle james2doyle@gmail.com */

window.L = Lettuce.dom = function(selector, context, undefined) {
	// an object containing the matching keys and native get commands
	var matches = {
		'#': 'getElementById',
		'.': 'getElementsByClassName',
		'@': 'getElementsByName',
		'=': 'getElementsByTagName',
		'*': 'querySelectorAll'
	}[selector[0]]; // you can treat a string as an array of characters
	// now pass the selector without the key/first character
	var el = (((context === undefined) ? document: context)[matches](selector.slice(1)));
	// if there is one element than return the 0 element
	return ((el && el.length < 2) ? el[0]: el);
};
