const {sum, subtract} = require("./Simple"); 

test('sum adds numbers', () => {
	const result = sum(3,7);
	const expected = 10;
	expect(result).toBe(expected);
});
test('subtract subtracts numbers', () => {
	const result = subtract(3,7);
	const expected = -4;
	expect(result).toBe(expected);
});



//overview: one of the limitations about how this expect test is written is that as soon as one of the tests throws an error, the other tests are not run
//it really helps devs to be able to see what the results of the other tests are when trying to identify issues
//when errors are thrown, it goes straight to the line on which the error was thrown (here, line 21) - it takes time to see which test failed
