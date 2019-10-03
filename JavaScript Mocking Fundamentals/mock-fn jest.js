const thumbWar = require("./thumb-war");
const utils = require("./utils");

jest.mock("../utils",()=>{
    return {
        getWinner: jest.fn((p1,p2) => p1)
    }
})

test('returns winner',()=>{
    
    //NOT NEEDED WHEN YOU RUN jest.mock
    // jest.spyOn(utils,'getWinner'); //=> creates a mocked empty function
    // utils.getWinner.mockImplementation((p1,p2) => p1);//replaces mocked utils with the function (p1,p2)=>p1 . . . this will be the new mocked function

    const winner = thumbWar("Kent C Dodds","Ken Wheeler");
    expect(winner).toBe("Kent C Dodds");
    expect(utils.getWinner.mock.calls).toEqual([
        ['Kent C Dodds','Ken Wheeler'],
        ['Kent C Dodds','Ken Wheeler']
    ]);
    //all the below assertions are covered by the one right above this comment
    // expect(utils.getWinner).toHaveBeenCalledTimes(2)
    // expect(utils.getWinner).toHaveBeenCalledWith("Kent C Dodds","Ken Wheeler");
    // expect(utils.getWinner).toHaveBeenNthCalledWith(
    //     1,
    //     "Kent C Dodds",
    //     "Ken Wheeler"
    // );
    // expect(utils.getWinner).toHaveBeenNthCalledWith(
    //     2,
    //     "Kent C Dodds",
    //     "Ken Wheeler"
    // )

    //cleanup task
    //NOT USED WHEN YOU USE jest.mock
    // utils.getWinner.mockRestore();//restores function to original
    //instead use .mockReset() - returns mocked function to its initial state - clears out the calls
    utils.getWinner.mockReset();
})