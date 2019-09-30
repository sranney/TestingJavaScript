const {sum, subtract} = require("./Throw An Error with a Simple Test in JavaScript"); 

let result, expected;

result = sum(3,7);
expected = 10;
expected(result).toBe(expected);

result = subtract(3,7);
expected = -4;
expected(result).toBe(expected);


//function is like an assertion library
//fundamentally it takes an "actual" value
//and returns assertions functions that we can make on that value 
function expect(actual) {
	return {
		toBe(expected) {
			if (actual !== expected) {
				throw new Error(`${actual} is not equal to ${expected}`);
			}
		}
	}
};

//overview: one of the limitations about how this test is written is that as soon as one of the tests throws an error, the other tests are not run
//it really helps devs to be able to see what the results of the other tests are when trying to identify issues
//when errors are thrown, it goes straight to the line on which the error was thrown (here, line 21) - it takes time to see which test failed
