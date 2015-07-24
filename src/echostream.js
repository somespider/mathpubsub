/*jslint node: true */
"use strict";

var util = require('util');
var Writable = require('stream').Writable;

var _ = require("lodash");

function EchoStream(opts) {
	if (!(this instanceof EchoStream)) {
		return new EchoStream(opts);
	}

	Writable.call(this, opts);

	this.options = _.defaults(opts || {}, {
		prefix: ""
	});
}

util.inherits(EchoStream, Writable);

EchoStream.prototype._write = function(chunk, encoding, done) {
	console.log(this.options.prefix, chunk.toString());

	done();
};

module.exports = EchoStream;
