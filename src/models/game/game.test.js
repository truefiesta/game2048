import Game from "./game";
import {Move} from "../../const";
import {calcMatrixSum} from "../board/utils";

describe(`Game class`, () => {
    let game;
    const size = 4;
    beforeEach(() => {
        game = new Game(size);
    })
    
    it(`can create a new game`, () => {
        expect(game.getStep()).toEqual(0);
        expect(game.getScore()).toEqual(0);
    });

    it(`sets new score`, () => {
        const newScore = 128;
        game.setScore(newScore);
        expect(game.getScore()).toEqual(newScore);
    });

    describe(`game process`, () => {
        it(`does not allow an invalid move`, () => {
            const initialMatrix = [
                [4, 0, 0, 0],
                [2, 4, 8, 2],
                [4, 0, 0, 0],
                [8, 0, 0, 0]
            ];
            game.setBoardValues(initialMatrix);
            expect(game.getScore()).toEqual(0);
            expect(game.getStep()).toEqual(0);
            game.move(Move.UP);
            expect(game.getScore()).toEqual(0);
            expect(game.getStep()).toEqual(0);
        });

        it(`updates the score and the step after a move when tiles merge`, () => {
            const initialMatrix = [
                [4, 0, 0, 0],
                [2, 2, 2, 2],
                [4, 4, 4, 0],
                [8, 0, 8, 0]
            ];
    
            game.setBoardValues(initialMatrix);
            expect(game.getScore()).toEqual(0);
            expect(game.getStep()).toEqual(0);
            game.move(Move.DOWN);
            expect(game.getScore()).toEqual(32);
            expect(game.getStep()).toEqual(1);
        });

        it(`does not update the score, but updates the step after a move when tiles change position, but do not merge`, () => {
            const initialMatrix = [
                [4, 0, 0, 0],
                [2, 4, 8, 2],
                [4, 0, 0, 0],
                [8, 0, 0, 0]
            ];
            game.setBoardValues(initialMatrix);
            expect(game.getScore()).toEqual(0);
            expect(game.getStep()).toEqual(0);
            game.move(Move.DOWN);
            expect(game.getScore()).toEqual(0);
            expect(game.getStep()).toEqual(1);
        });

        it(`creates a new tile after a valid move`, () => {
            const initialMatrix = [
                [4, 0, 0, 0],
                [2, 4, 8, 2],
                [4, 0, 0, 0],
                [8, 0, 0, 0]
            ];
            game.setBoardValues(initialMatrix);
            expect(game.getStep()).toEqual(0);
            game.move(Move.DOWN);
            expect(game.getStep()).toEqual(1);
            const initialMatrixSum = calcMatrixSum(initialMatrix);
            expect(calcMatrixSum(game.getBoardValues())).toBeGreaterThan(initialMatrixSum);
        });

        it(`doesn't create a new tile if the move is invalid`, () => {
            const initialMatrix = [
                [4, 0, 0, 0],
                [2, 4, 8, 2],
                [4, 0, 0, 0],
                [8, 0, 0, 0]
            ];
            game.setBoardValues(initialMatrix);
            expect(game.getStep()).toEqual(0);
            game.move(Move.UP);
            expect(game.getStep()).toEqual(0);
            const initialMatrixSum = calcMatrixSum(initialMatrix);
            expect(calcMatrixSum(game.getBoardValues())).toEqual(initialMatrixSum);
        });

        it(`ends the game if there are no possible moves left`, () => {
            const initialMatrix = [
                [1, 5, 9, 13],
                [2, 6, 10, 14],
                [3, 7, 11, 15],
                [17, 18, 16, 16]
            ];
            game.setBoardValues(initialMatrix);
            expect(game.getStep()).toEqual(0);
            expect(game.hasEnded()).toEqual(false);
            game.move(Move.DOWN);
            expect(game.getStep()).toEqual(1);
            expect(game.hasEnded()).toEqual(true);
        });

        it(`does not end the game if there is a possible move`, () => {
            const initialMatrix = [
                [1, 5, 9, 13],
                [2, 6, 10, 14],
                [19, 17, 100, 15],
                [20, 100, 16, 16]
            ];
            game.setBoardValues(initialMatrix);
            expect(game.getStep()).toEqual(0);
            expect(game.hasEnded()).toEqual(false);
            game.move(Move.DOWN);
            expect(game.getStep()).toEqual(1);
            expect(game.hasEnded()).toEqual(false);
            game.move(Move.RIGHT);
            expect(game.getStep()).toEqual(2);
            expect(game.hasEnded()).toEqual(true);
        });

        it(`detects a win if there is a tile with the winning value after a move`, () => {
            const initialMatrix = [
                [1, 5, 9, 13],
                [2, 6, 10, 14],
                [19, 17, 100, 15],
                [20, 100, 1024, 1024]
            ];
            game.setBoardValues(initialMatrix);
            expect(game.getStep()).toEqual(0);
            expect(game.hasWin()).toEqual(false);
            game.move(Move.DOWN);
            expect(game.getStep()).toEqual(1);
            expect(game.hasWin()).toEqual(true);
        });
    });
});
