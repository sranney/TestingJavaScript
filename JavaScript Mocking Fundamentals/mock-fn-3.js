const assert = require("assert");
const thumbWar = require("./thumb-war");
const utils = require("./utils");

const fn = (impl = () => {}) => {
    const mockFn = (...args) => {
        mockFn.mock.calls.push(args);
        return impl(...args);
    }
    mockFn.mock = { calls: [] };
    mockFn.mockImplementation = newImpl => (impl = newImpl);
    return mockFn;
}

function spyOn(obj, prop) {
    const original = obj[prop];
    obj[prop] = fn();
    obj[prop].mockRestore = () => (obj[prop] = original);
}

spyOn(utils, "getWinner");
utils.getWinner.mockImplementation((p1,p2)=>p2);

const winner = thumbWar("Kent C Dodds", "Spencer Ranney");
assert.strictEqual(winner, "Spencer Ranney");
assert.deepStrictEqual(utils.getWinner.mock.calls, [
    ["Kent C Dodds", "Spencer Ranney"],
    ["Kent C Dodds", "Spencer Ranney"]
])//verifies that the function was called twice and that the arguments are the same as what was called with

//clean up
utils.getWinner.mockRestore();