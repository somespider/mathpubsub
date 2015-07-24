/*jslint node: true */
"use strict";

var util = require('util');
var Readable = require('stream').Readable;

var _ = require("lodash");

var operators = require("./operators");

function ExpressionStream(opts) {
	if (!(this instanceof ExpressionStream)) {
		return new ExpressionStream(opts);
	}

	Readable.call(this, opts);

	this.options = _.defaults(opts || {}, {
		speed: 100
	});
}

util.inherits(ExpressionStream, Readable);

// returns a random integer which we can safely multiply by itself
function makeInteger() {
	return _.random(0, Math.floor(Math.sqrt(Number.MAX_SAFE_INTEGER)));
}

function makeExpression() {
	var operands = [makeInteger(), makeInteger()];
	return operands.join(_.sample(_.keys(operators))) + "=";
}

ExpressionStream.prototype._read = function() {
	setTimeout(function() {
		this.push(makeExpression());
	}.bind(this), this.options.speed);
};

module.exports = ExpressionStream;
