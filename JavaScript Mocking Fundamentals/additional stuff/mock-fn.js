//fn takes an implementation
//returns a function that returns that implementation
//this allows us to check for issues with the implementation of the getwinner function as shown on line 
//23
//for section 5 not needed because it is moved into the module mocks directory (__no-framework-mocks__)
// function fn(impl) {
//     const mockFn = (...args) => {
//         mockFn.mock.calls.push(args);
//         return impl(...args);
//     }
//     mockFn.mock = { calls: [] };
//     mockFn.mockImplementation = newImpl => (impl = newImpl);
//     return mockFn;
// };

require("../__no-framework-mocks__/utils");//prime the cache - gets this in the require.cache
const utilsPath = require.resolve('./utils');//this line and 17-24 hijack the getWinner function 
const mockUtilsPath = require.resolve('./__no-framework-mocks__/utils');
require.cache[utilsPath] = require.cache[mockUtilsPath] //overwrite the utilsPath with the mocked path
//as seen by a console.log of require.cache - require.cache is an object that contains a Module
//all we need now is 16-19
// require.cache[utilsPath] = {//needs to resemble module
//     id: utilsPath,
//     filename: utilsPath,
//     loaded: true,
//     exports: {
//         getWinner: fn((p1, p2) => p1)//here is where the crux of this exercise is - doing this is a lot like jest.mock
//         //takes control of the utils being exported (remember module.exports is what we use? this is that)
//         //when being imported in to this file, so the utils.getWinner we get is actually this one, not the one from the file
//     }
// }

const assert = require("assert");
const thumbWar = require("../thumb-war");
const utils = require("../utils");

//not needed with our new mock function
// function spyOn(obj,prop) {
//     const originalValue = obj[prop];
//     obj[prop] = fn();
//     obj[prop].mockRestore = ()=>(obj[prop] = originalValue);
// }
// spyOn(utils,'getWinner');
// utils.getWinner.mockImplementation((p1,p2) => p1);

const winner = thumbWar("Kent Dodds","Spencer Ranney");
assert.strictEqual(winner,"Kent Dodds");
assert.deepStrictEqual(utils.getWinner.mock.calls, [
    ['Kent Dodds','Spencer Ranney'],
    ['Kent Dodds','Spencer Ranney']
]);

//cleanup
delete require.cache[utilsPath];