/*jslint node: true */
"use strict";

var http = require('http');
var SolverStream = require("./src/solverstream");
var EchoStream = require("./src/echostream");

var server = http.createServer(function(req, res) {
	var solver = new SolverStream();

	req.pipe(new EchoStream({prefix: "Server received:"}));

	var computed = req.pipe(solver);

	computed.pipe(new EchoStream({prefix: "Server sent:"}));
	computed.pipe(res);
});

server.listen(5000);

console.log("Consumer is started and listening on port 5000");
