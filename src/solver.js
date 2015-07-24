/*jslint node: true */
"use strict";

var _ = require("lodash");

var operators = require("./operators");

function Solver(opts) {
	var options = _.defaults(opts || {}, {
		operators: {}
	});

	_.defaults(options.operators, operators);

	this.operators = options.operators;
	this.regex = makeRegex(this.getOperators());
}

Solver.prototype.getOperators = function() {
	return _.keys(this.operators);
};

function makeRegex(operators) {

	// escape operators with a special regex meaning
	var special = "[-[\]{}()*+?.,\\^$|#\s]"; // jshint ignore:line
	operators = operators.map(function(operator) {
		if (special.indexOf(operator) != -1) {
			return "\\" + operator;
		}
		return operator;
	});

	return new RegExp("^(\\d+)(" + operators.join("|") + ")(\\d+)=$");
}

Solver.prototype.operate = function(operator, operand1, operand2) {
	return this.operators[operator](operand1, operand2);
};

Solver.prototype.solve = function(string) {
	var matches = this.regex.exec(string);

	if (matches === null) {
		return null;
	}

	var operator = matches[2];
	var operand1 = parseInt(matches[1], 10);
	var operand2 = parseInt(matches[3], 10);

	var output = this.operate(operator, operand1, operand2);

	return output;
};

module.exports = Solver;
