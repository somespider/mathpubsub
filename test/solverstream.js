var chai = require("chai");
var expect = chai.expect;
var _ = require("lodash");

var SolverStream = require("../src/solverstream");

var helpers = require("./helpers");

var interestingCases = [[2, 2], [2, 0], [3, 5], [9, 10], [111, 1], [193, 0], [0, 0]];

function testIt(input, output) {
	it("should respond to " + input + " with " + output, function(done) {
		var stream = new SolverStream();

		stream.on("data", function(data) {
			expect(data.toString()).to.equal(output);
			done();
		});

		stream.write(input);
	});
}

describe("SolverStream", function() {
	helpers.testAllOperators(function(operator, operands, result) {
		testIt(operands[0] + operator + operands[1] + "=", "" + result);
	});

	describe("error handling", function() {
		describe("should return null for negative integers", function() {
			testIt("-1+2=", "invalid expression");
		});

		describe("should return null for incomplete expressions", function() {
			testIt("-1+2", "invalid expression");
			testIt("-1", "invalid expression");
			testIt("1", "invalid expression");
			testIt("1+3", "invalid expression");
		});

		it("should return null for non-math expressions", function() {
			testIt("hello world", "invalid expression");
		});
	});
});
