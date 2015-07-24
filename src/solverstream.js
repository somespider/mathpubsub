/*jslint node: true */
"use strict";

var util = require('util');
var Transform = require('stream').Transform;

var _ = require("lodash");

var Solver = require("./solver");

function SolverStream(opts) {
	if (!(this instanceof SolverStream)) {
		return new SolverStream(opts);
	}

	Transform.call(this, opts);

	var options = _.defaults(opts || {}, {
		solver: {}
	});

	this.solver = new Solver(options.solver);
}

util.inherits(SolverStream, Transform);

SolverStream.prototype._transform = function(chunk, encoding, done) {
	var expression = chunk.toString();

	var solution = this.solver.solve(expression);

	if (solution === null) {
		this.push("invalid expression");
	} else {
		this.push("" + solution);
	}

	done();
};


module.exports = SolverStream;
