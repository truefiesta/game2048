import Board, {BoardSize, BoardSizeToInitialFilledTilesNumber, Move} from "./board";

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

        it(`moves non-bottom tiles to the bottom and merges values`, () => {
            const initialMatrix = [
                [4, 0, 0, 0],
                [2, 2, 2, 2],
                [4, 4, 4, 0],
                [8, 0, 8, 0]
            ];
            const finalMatrix = [
                [0, 0, 0, 4],
                [0, 0, 4, 4],
                [0, 0, 4, 8],
                [0, 0, 0, 16]
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

        it(`moves non-top tiles to the top and merges values`, () => {
            const initialMatrix = [
                [4, 4, 0, 2],
                [0, 2, 8, 2],
                [0, 0, 4, 0],
                [2, 0, 2, 2]
            ];
            const finalMatrix = [
                [8, 2, 0, 0],
                [2, 8, 2, 0],
                [4, 0, 0, 0],
                [4, 2, 0, 0]
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

        it(`moves tiles to the right and merges values`, () => {
            const initialMatrix = [
                [0, 2, 4, 0],
                [2, 4, 4, 2],
                [0, 2, 0, 0],
                [2, 2, 4, 0]
            ];
            const finalMatrix = [
                [0, 0, 0, 0],
                [0, 2, 0, 0],
                [0, 4, 4, 0],
                [4, 4, 8, 2]
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

        it(`moves tiles to the left and merges values`, () => {
            const initialMatrix = [
                [4, 0, 0, 2],
                [0, 0, 2, 2],
                [2, 4, 2, 2],
                [2, 0, 2, 2]
            ];
            const finalMatrix = [
                [4, 4, 4, 4],
                [4, 0, 2, 4],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ];
            board.setMatrix(initialMatrix);
            board.moveTiles(Move.LEFT);
            expect(board.getMatrix()).toEqual(finalMatrix);
        });
    });

    it(`sets a given value on a random empty tile `, () => {
        const initialMatrix = [
            [4, 0, 0, 2],
            [0, 0, 2, 2],
            [2, 4, 2, 2],
            [2, 0, 2, 2]
        ];
        const initialMatrixSum = calcMatrixSum(initialMatrix);
        const newTileValue = 2;
        board.setMatrix(initialMatrix);
        board.setValueOnRandomEmptyTile(newTileValue);
        const finalMatrixSum = calcMatrixSum(board.getMatrix());
        expect(finalMatrixSum).toEqual(initialMatrixSum + newTileValue);
    });
});
