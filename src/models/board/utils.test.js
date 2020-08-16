import {
    moveArrayValues,
    turnMartixRight,
    turnMatrixLeft,
    moveAndMergeValues,
    checkMergeAbilityInColumns,
    checkMergeAbility
} from "./utils";

describe(`moveArrayValues`, () => {
    it(`moves a non-bottom tile to the very bottom`, () => {
        expect(moveArrayValues([2, 0, 0, 0])).toEqual([0, 0, 0, 2]);
    });

    it(`doesn't move a tile that is located in the very bottom`, () => {
        expect(moveArrayValues([0, 0, 0, 2])).toEqual([0, 0, 0, 2]);
    });

    it(`moves a non-bottom tile right to the tile located in the very bottom`, () => {
        expect(moveArrayValues([128, 0, 0, 4])).toEqual([0, 0, 128, 4]);
    });

    it(`moves two non-bottom tiles to the bottom`, () => {
        expect(moveArrayValues([4, 0, 2, 0])).toEqual([0, 0, 4, 2]);
    });

    it(`moves three non-bottom tiles to the bottom`, () => {
        expect(moveArrayValues([2, 4, 2, 0])).toEqual([0, 2, 4, 2]);
    });

    it(`doesn't move four tiles`, () => {
        expect(moveArrayValues([2, 4, 2, 8])).toEqual([2, 4, 2, 8]);
    });

    it(`moves and merges tiles into one tile at the bottom case one`, () => {
        const mergeResult = moveAndMergeValues([2, 2, 0, 0]);
        expect(mergeResult[0]).toEqual([0, 0, 0, 4]);
    });

    it(`moves and merges tiles into one tile at the bottom case two`, () => {
        const mergeResult = moveAndMergeValues([2, 0, 0, 2]);
        expect(mergeResult[0]).toEqual([0, 0, 0, 4]);
    });

    it(`moves a non-bottom tile and merges it the the bottom tile`, () => {
        const mergeResult = moveAndMergeValues([0, 2, 0, 2]);
        expect(mergeResult[0]).toEqual([0, 0, 0, 4]);
    });

    it(`moves three non-bottom tiles and merges two of them into one tile at the bottom`, () => {
        const mergeResult = moveAndMergeValues([2, 2, 2, 0]);
        expect(mergeResult[0]).toEqual([0, 0, 2, 4]);
    });

    it(`merges four tiles into a pair of tile an moves them to the bottom`, () => {
        const mergeResult = moveAndMergeValues([4, 4, 4, 4]);
        expect(mergeResult[0]).toEqual([0, 0, 8, 8]);
    });

    it(`merges two tiles at the bottom`, () => {
        const mergeResult = moveAndMergeValues([0, 0, 8, 8]);
        expect(mergeResult[0]).toEqual([0, 0, 0, 16]);
    });

    it(`merges two tiles in the middle and moves all tiles to the bottom case one`, () => {
        const mergeResult = moveAndMergeValues([8, 2, 2, 8]);
        expect(mergeResult[0]).toEqual([0, 8, 4, 8]);
    });

    it(`merges two tiles in the middle and moves all tiles to the bottom case two`, () => {
        const mergeResult = moveAndMergeValues([4, 4, 0, 4]);
        expect(mergeResult[0]).toEqual([0, 0, 4, 8]);
    });
});

describe(`turning functions`, () => {
    describe(`turnMartixRight`, () => {
        it(`turns matrix right`, () => {
            const initialMatrix = [
                [1, 2, 3, 4],
                [5, 6, 7, 8],
                [9, 10, 11, 12],
                [13, 14, 15, 16]
            ];

            const finalMatrix = [
                [4, 8, 12, 16],
                [3, 7, 11, 15],
                [2, 6, 10, 14],
                [1, 5, 9, 13]
            ];

            expect(turnMartixRight(initialMatrix)).toEqual(finalMatrix);
        })
    });

    describe(`turnMartixLeft`, () => {
        it(`turns matrix left`, () => {
            const initialMatrix = [
                [1, 2, 3, 4],
                [5, 6, 7, 8],
                [9, 10, 11, 12],
                [13, 14, 15, 16]
            ];

            const finalMatrix = [
                [13, 9, 5, 1],
                [14, 10, 6, 2],
                [15, 11, 7, 3],
                [16, 12, 8, 4]
            ];

            expect(turnMatrixLeft(initialMatrix)).toEqual(finalMatrix);
        })
    });
});

describe(`functions that check merging ability`, () => {
    const matrixOne = [
        [1, 2, 2, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 12],
        [13, 14, 15, 16]
    ];
      
    const matrixTwo = [
        [1, 5, 9, 13],
        [2, 6, 10, 14],
        [4, 7, 11, 15],
        [4, 8, 12, 16]
    ];
    
    const matrixThree = [
        [1, 5, 9, 13],
        [2, 6, 10, 14],
        [3, 7, 11, 15],
        [4, 8, 12, 16]
    ];

    it(`checks if numbers in the matrix columns can be merged`, () => {
        expect(checkMergeAbilityInColumns(matrixOne)).toEqual(true);
        const turnedMatrixOne = turnMartixRight(matrixOne);
        expect(checkMergeAbilityInColumns(turnedMatrixOne)).toEqual(false);
        
        expect(checkMergeAbilityInColumns(matrixTwo)).toEqual(false);
        const turnedMatrixTwo = turnMartixRight(matrixTwo);
        expect(checkMergeAbilityInColumns(turnedMatrixTwo)).toEqual(true);
        
        expect(checkMergeAbilityInColumns(matrixThree)).toEqual(false);
        const turnedMatrixThree = turnMartixRight(matrixThree);
        expect(checkMergeAbilityInColumns(turnedMatrixThree)).toEqual(false);
    });

    it(`checks if numbers in the matrix can be mergin in columns or in rows`, () => {
        const initialMatrix = [
            [1, 5, 9, 13],
            [2, 2, 10, 14],
            [3, 7, 11, 15],
            [4, 8, 12, 16]
        ];
        expect(checkMergeAbility(initialMatrix)).toEqual(true);

        expect(checkMergeAbility(matrixOne)).toEqual(true);
        expect(checkMergeAbility(matrixTwo)).toEqual(true);
        expect(checkMergeAbility(matrixThree)).toEqual(false);
    });
})
