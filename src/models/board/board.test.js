import Board, {BoardSize, BoardSizeToInitialFilledTilesNumber, generateRandomTileValue, Move, moveArrayValues, turnMartixRight, turnMatrixLeft} from "./board";

describe(`Board class`, () => {
    const size = 4;
    let board;
    beforeEach(() => {
        board = new Board(size);
    })

    it(`can create a board with a given size`, () => {
        expect(board.getSize()).toEqual(size);
    });

    it(`initializes a board with the start setting`, () => {
        expect(board.countFilledTiles()).toEqual(BoardSizeToInitialFilledTilesNumber[BoardSize.SMALL_BOARD]);
    });

    describe(`move down`, () => {
        it(`moves non-bottom tiles to the bottom`, () => {
            const initialMatrix = [
                [0, 2, 0, 0],
                [4, 2, 0, 0],
                [0, 0, 2, 8],
                [0, 8, 2, 0]
            ];
            const finalMatrix = [
                [0, 0, 0, 2],
                [0, 0, 4, 2],
                [0, 0, 2, 8],
                [0, 0, 8, 2]
            ];
            board.setMatrix(initialMatrix);
            board.moveTiles(Move.DOWN);
            expect(board.getMatrix()).toEqual(finalMatrix);
        });
    });

    describe(`move up`, () => {
        it(`moves non-top tiles to the top`, () => {
            const initialMatrix = [
                [0, 2, 0, 0],
                [4, 2, 0, 0],
                [0, 0, 2, 8],
                [0, 8, 2, 0]
            ];
            const finalMatrix = [
                [2, 0, 0, 0],
                [4, 2, 0, 0],
                [2, 8, 0, 0],
                [8, 2, 0, 0]
            ];
            board.setMatrix(initialMatrix);
            board.moveTiles(Move.UP);
            expect(board.getMatrix()).toEqual(finalMatrix);
        });
    });

    describe(`move right`, () => {
        it(`moves tiles to the right`, () => {
            const initialMatrix = [
                [0, 2, 5, 0],
                [7, 3, 0, 4],
                [0, 0, 1, 0],
                [8, 0, 0, 0]
            ];
            const finalMatrix = [
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [7, 2, 5, 0],
                [8, 3, 1, 4]
            ];
            board.setMatrix(initialMatrix);
            board.moveTiles(Move.RIGHT);
            expect(board.getMatrix()).toEqual(finalMatrix);
        });
    });

    describe(`move left`, () => {
        it(`moves tiles to the left`, () => {
            const initialMatrix = [
                [0, 2, 0, 0],
                [4, 5, 0, 0],
                [0, 0, 7, 8],
                [0, 8, 2, 0]
            ];
            const finalMatrix = [
                [4, 2, 7, 8],
                [0, 5, 2, 0],
                [0, 8, 0, 0],
                [0, 0, 0, 0]
            ];
            board.setMatrix(initialMatrix);
            board.moveTiles(Move.LEFT);
            expect(board.getMatrix()).toEqual(finalMatrix);
        });
    });
});

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
});

describe(`generateRandomTileValue`, () => {
    it(`On the initial step generates 2 more often than 4`, () => {
        const step = 0;
        const randomNums = new Array(100).fill(generateRandomTileValue(step));
        const countTwos = randomNums.filter((num) => num === 2).length;
        const countFours = randomNums.filter((num) => num === 4).length;
        expect(countTwos/countFours).toBeGreaterThan(2);
        expect(countFours + countTwos).toEqual(100);
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
