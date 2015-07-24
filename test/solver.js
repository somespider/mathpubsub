var chai = require("chai");
var expect = chai.expect;
var _ = require("lodash");

var Solver = require("../src/solver");

var helpers = require("./helpers");

describe("Solver", function() {
	describe("operator list", function() {
		var solver = new Solver();
		var operators = solver.getOperators();

		it("should include addition", function() {
			expect(operators).to.include("+");
		});

		it("should include subtraction", function() {
			expect(operators).to.include("-");
		});
	});

	helpers.testAllOperators(function(operator, operands, result) {
		var solver = new Solver();
		it("computes " + operands[0] + operator + operands[1] + "=" + result, function() {
			expect(solver.operate(operator, operands[0], operands[1])).to.equal(result);
			expect(solver.solve(operands.join(operator) + "=")).to.equal(result);
		});
	});

	describe("error handling", function() {
		var solver = new Solver();

		it("should return null for negative integers", function() {
			expect(solver.solve("-1+2=")).to.equal(null);
		});

		it("should return null for incomplete expressions", function() {
			expect(solver.solve("-1+2")).to.equal(null);
			expect(solver.solve("-1")).to.equal(null);
			expect(solver.solve("1")).to.equal(null);
			expect(solver.solve("1+3")).to.equal(null);
		});

		it("should return null for non-math expressions", function() {
			expect(solver.solve("hello world")).to.equal(null);
		});
	});
});
