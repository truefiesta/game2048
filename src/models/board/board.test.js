import Board, {BoardSize, BoardSizeToInitialFilledTilesNumber, generateRandomTileValue, Move} from "./board";

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
        it(`moves a non-bottom tile to the very bottom`, () => {
            board.setColumn(0, [2, 0, 0, 0]);
            expect(board.getColumn(0)).toEqual([2, 0, 0, 0]);
            board.moveTiles(Move.DOWN);
            expect(board.getColumn(0)).toEqual([0, 0, 0, 2]);
        });

        it(`doesn't move a tile that is located in the very bottom`, () => {
            board.setColumn(0, [0, 0, 0, 2]);
            expect(board.getColumn(0)).toEqual([0, 0, 0, 2]);
            board.moveTiles(Move.DOWN);
            expect(board.getColumn(0)).toEqual([0, 0, 0, 2]);
        });

        it(`moves a non-bottom tile right to the tile located in the very bottom`, () => {
            board.setColumn(0, [128, 0, 0, 4]);
            expect(board.getColumn(0)).toEqual([128, 0, 0, 4]);
            board.moveTiles(Move.DOWN);
            expect(board.getColumn(0)).toEqual([0, 0, 128, 4]);
        });

        it(`moves two non-bottom tiles to the bottom`, () => {
            board.setColumn(0, [4, 0, 2, 0]);
            expect(board.getColumn(0)).toEqual([4, 0, 2, 0]);
            board.moveTiles(Move.DOWN);
            expect(board.getColumn(0)).toEqual([0, 0, 4, 2]);
        });

        it(`moves three non-bottom tiles to the bottom`, () => {
            board.setColumn(0, [2, 4, 2, 0]);
            expect(board.getColumn(0)).toEqual([2, 4, 2, 0]);
            board.moveTiles(Move.DOWN);
            expect(board.getColumn(0)).toEqual([0, 2, 4, 2]);
        });

        it(`doesn't move four tiles`, () => {
            board.setColumn(0, [2, 4, 2, 8]);
            expect(board.getColumn(0)).toEqual([2, 4, 2, 8]);
            board.moveTiles(Move.DOWN);
            expect(board.getColumn(0)).toEqual([2, 4, 2, 8]);
        });
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
