import {generateRandomTileValue} from "./utils";

describe(`generateRandomTileValue`, () => {
    it(`On the initial step generates 2 more often than 4`, () => {
        const step = 0;
        const randomNums = new Array(100).fill(0).map(() => generateRandomTileValue(step));
        const countTwos = randomNums.filter((num) => num === 2).length;
        const countFours = randomNums.filter((num) => num === 4).length;
        expect(countTwos).toBeGreaterThan(countFours);
        expect(countFours + countTwos).toEqual(100);
    });
});
