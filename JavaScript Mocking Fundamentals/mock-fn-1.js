const assert = require("assert");
const thumbWar = require("./thumb-war");
const utils = require("./utils");

const originalGetWinner = utils.getWinner;
utils.getWinner = (p1,p2) => p2 //mocking the getWinner function to always return p1 - guarantees we know how this works
//this controls getWinner, so we can know for sure if something doesn't go as expected, it cannot be this
//reduce unknowns in testing a certain function by mocking other functions called in the tested function to give us a standard, known answer

const winner = thumbWar("Kent C Dodds","Spencer Ranney");
assert.strictEqual(winner, "Spencer Ranney")

utils.getWinner = originalGetWinner;
//assigning a new variable to the original function so that it can be reassigned after a mock is called monkey patching
