var _ = require("lodash");

var interestingCases = [[2, 2], [2, 0], [3, 5], [9, 10], [111, 1], [193, 0], [0, 0]];

function testOperator(tester, operator, operation, specialCases) {
	var cases = interestingCases.concat(_.times(10, function() {
		return [_.random(0, Math.floor(Math.sqrt(Number.MAX_SAFE_INTEGER))), _.random(0, Math.floor(Math.sqrt(Number.MAX_SAFE_INTEGER)))];
	}));

	cases.forEach(function(operands) {
		var result = operation(operands[0], operands[1]);

		tester(operator, operands, result);
	});

	specialCases.forEach(function(operands) {
		var result = operands[2];
		
		tester(operator, operands.slice(0, 2), result);
	});
}

function testAllOperators(tester) {
	describe("test addition", function() {
		testOperator(tester, "+", function(a, b) {
			return a + b;
		}, [[94906265, 94906265, 189812530], [2, 2, 4], [1, 6, 7], [5, 3, 8]]);
	});

	describe("test subtraction", function() {
		testOperator(tester, "-", function(a, b) {
			return a - b;
		}, [[94906265, 94906265, 0], [3, 4, -1], [2, 2, 0], [4, 1, 3]]);
	});
}

module.exports = {
	testAllOperators: testAllOperators
};
