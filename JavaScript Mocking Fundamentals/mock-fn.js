const asset = require("assert");
const thumbWar = require("./thumb-war");
const utils = require("./utils");

//fn takes an implementation
//returns a function that returns that implementation
//this allows us to check for issues with the implementation of the getwinner function as shown on line 
//23
function fn(impl) {
    const mockFn = (...args) => {
        mockFn.mock.calls.push(args);
        return impl(...args);
    }
    mockFn.mock = {calls: []}
    return mockFn;
};

const originalGetWinner = utils.getWinner;
utils.getWinner = fn((p1,p2) => p1);

const winner = thumbWar("Kent Dodds","Spencer Ranney");
asset.strictEqual(winner,"Kent Dodds");
console.log(utils.getWinner.mock.calls);
assert.deepStrictEqual(utils.getWinner.mock.calls, [
    ['Kent Dodds','Spencer Ranney'],
    ['Kent Dodds','Spencer Ranney']
]);
//cleanup
utils.getWinner = originalGetWinner;