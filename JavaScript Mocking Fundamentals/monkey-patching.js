const assert = require("assert");
const thumbWar = require("./thumb-war");
const utils = require("./utils");

//ALERT - MONKEY PATCHING
const originalGetWinner = utils.getWinner;
// mocking the getWinner function
utils.getWinner = (p1,p2) => p2;

const winner = thumbWar("Kent C Dodds","Spencer Ranney")
assert.strictEqual(winner,"Spencer Ranney")
utils.getWinner = originalGetWinner;