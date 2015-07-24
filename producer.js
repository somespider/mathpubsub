/*jslint node: true */
"use strict";

var http = require('http');
var _ = require("lodash");

var operators = require("./src/operators");
var EchoStream = require("./src/echostream");
var ExpressionStream = require("./src/expressionstream");

function produce() {

	var req = http.request({
		port: 5000,
		method: "POST"
	}, function(response) {
		response.setEncoding('utf8');

		response.pipe(new EchoStream({prefix: "Client received:"}));

		response.on("end", function() {
			console.log("Producer has died.");
			process.exit();
		});
	});

	req.on("error", function(error) {
		if (error.code === "ECONNREFUSED") {
			console.log("Please start the consumer before the producer.");
			process.exit();
		} else {
			throw error;
		}
	});

	var stream = new ExpressionStream();

	stream.pipe(req);
	stream.pipe(new EchoStream({prefix: "Client sent:"}));
}

produce();
