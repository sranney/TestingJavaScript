require("./__no-framework-mocks__/utils");//prime the cache - doing this will load require.cache with a module for the no-framework-mocks/utils mock
const utilsPath = require.resolve('./utils');
const mockUtilsPath = require.resolve("./__no-framework-mocks__/utils");
require.cache[utilsPath] = require.cache[mockUtilsPath]//because of line 1, require.cache now has the mock in it
//we can simply set the actual utils import to be equal to the mocked - this will then set what is imported from utils to the mocked utils in __no-framework-mocks__

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