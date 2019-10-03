const assert = require("assert");
const thumbWar = require("./thumb-war");
const utils = require("./utils");

const fn = (impl) => {
    const mockFn = (...args) => {
        mockFn.mock.calls.push(args);
        impl(...args);
    }
    mockFn.mock = {calls: []};
    return mockFn;
}

const originalGetWinner = utils.getWinner;
utils.getWinner = fn((p1,p2)=>p2);

const winner = thumbWar("Kent C Dodds","Spencer Ranney");
assert.strictEqual(winner, "Kent C Dodds");
assert.deepStrictEqual(utils.getWinner.mock.calls, [
    ["Kent C Dodds", "Spencer Ranney"],
    ["Kent C Dodds", "Spencer Ranney"]
])//verifies that the function was called twice and that the arguments are the same as what was called with

//clean up
utils.getWinner = originalGetWinner;