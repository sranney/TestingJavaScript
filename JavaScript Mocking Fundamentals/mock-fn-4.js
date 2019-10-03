const fn = (impl = () => { }) => {
    const mockFn = (...args) => {
        mockFn.mock.calls.push(args);
        return impl(...args);
    }
    mockFn.mock = { calls: [] };
    mockFn.mockImplementation = newImpl => (impl = newImpl);
    return mockFn;
}

const utilsPath = require.resolve('./utils');
require.cache[utilsPath] = {
    id: utilsPath,
    fileName: utilsPath,
    loaded: true,
    exports: {
        getWinner: fn((p1,p2) => p2)
    }
};

//console logging require.cache shows that require works on top of a Module structure
const assert = require("assert");
const thumbWar = require("./thumb-war");
//important note here: thumb-war requires utils - the work we are doing here of controlling require.cache impacts what is loaded into the thumb-war file - the mocked getWinner function is what is loaded

const utils = require("./utils"); //now utils will come in with the mocked function because we have taken control of the module

const winner = thumbWar("Kent C Dodds", "Spencer Ranney");
assert.strictEqual(winner, "Spencer Ranney");
assert.deepStrictEqual(utils.getWinner.mock.calls, [
    ["Kent C Dodds", "Spencer Ranney"],
    ["Kent C Dodds", "Spencer Ranney"]
])//verifies that the function was called twice and that the arguments are the same as what was called with

//clean up
delete require.cache[utilsPath];//deleting will cause require to load the actual file - overrides gone