const sum = (a,b) => setTimeout(()=>a+b,200);

const test = async (title, callback) => {
    try {
        await callback();
        console.log(`√ ${title}`);
    } catch (error) {
        console.error(error);
        console.error(`x ${title}`);
    }
}

const expect = actual => {
    return {
        toBe: expected => {
            if(actual !== expected) {
                throw new Error(`test failed: expected ${actual} to equal ${expected}`);
            }
        }
    }
}

test('sum adds numbers asynchronously', async () => {
    const result = await sum(3,2);
    const expected = 5;
    expect(result).toBe(expected);
});
