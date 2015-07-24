var chai = require("chai");
var expect = chai.expect;
var _ = require("lodash");

var ExpressionStream = require("../src/expressionstream");
var SolverStream = require("../src/solverstream");

describe("Integration Test", function() {
	it("SolverStream should evaluate all expressions from ExpressionStream", function(done) {
		var expressions = new ExpressionStream({speed: 10});
		var solverstream = new SolverStream();

		var checked = 0;

		solverstream.on("data", function(data) {
			expect(isNaN(data.toString())).to.equal(false);
			checked++;

			if (checked == 10) {
				done();
			}
		});

		expressions.pipe(solverstream);
	});
});
