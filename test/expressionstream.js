var chai = require("chai");
var expect = chai.expect;
var _ = require("lodash");

var ExpressionStream = require("../src/expressionstream");

describe("SolverStream", function() {
	it("should provide 10 valid expressions", function(done) {
		var stream = new ExpressionStream({speed: 10});
		var checker = new RegExp("^(\\d+)(\\+|\\-)(\\d+)=$");
		var checked = 0;
		
		stream.on("data", function(data) {
			expect(data.toString()).to.match(checker);
			checked++;

			if (checked == 10) {
				done();
			}
		});
	});
});
