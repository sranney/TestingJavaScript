const sum = (a,b) => a -b;
const subtract = (a,b) => a - b;

//most fundamental form of a test
let result = sum(3,7);
let expected = 10;
if (result !== expected) {
	throw new Error(`${result} is not equal to ${expected}`);
}

result = subtract(3,7);
expected = -4;
if(result !== expected) {
	throw new Error(`${result} is not equal to ${expected}`);
}

module.exports = {sum,subtract};