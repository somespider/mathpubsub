/*jslint node: true */
"use strict";

function addition(a, b) {
	return a + b;
}

function subtraction(a, b) {
	return a - b;
}

module.exports = {
	"+": addition,
	"-": subtraction
};
