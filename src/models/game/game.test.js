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

    it(`moves tiles down and updates the score when tiles merge`, () => {
        const initialMatrix = [
            [4, 0, 0, 0],
            [2, 2, 2, 2],
            [4, 4, 4, 0],
            [8, 0, 8, 0]
        ];

        game.setBoardValues(initialMatrix);
        expect(game.getScore()).toEqual(0);
        game.moveTiles(Move.DOWN);
        expect(game.getScore()).toEqual(32);
    });

    describe(`there are no empty tiles on the board but some tiles can be merged down or up`, () => {
        const initialMatrix = [
            [1, 5, 9, 13],
            [2, 2, 10, 14],
            [3, 7, 11, 15],
            [4, 8, 12, 16]
        ];
        it(`updates the score when recieves a down move`, () => {
            game.setBoardValues(initialMatrix);
            expect(game.getScore()).toEqual(0);
            game.moveTiles(Move.DOWN);
            expect(game.getScore()).toEqual(4);

            const initialMatrixSum = calcMatrixSum(initialMatrix);
            expect(calcMatrixSum(game.getBoardValues())).toBeGreaterThan(initialMatrixSum);
        });

        it(`updates the score when recieves a up move`, () => {
            game.setBoardValues(initialMatrix);
            expect(game.getScore()).toEqual(0);
            game.moveTiles(Move.UP);
            expect(game.getScore()).toEqual(4);

            const initialMatrixSum = calcMatrixSum(initialMatrix);
            expect(calcMatrixSum(game.getBoardValues())).toBeGreaterThan(initialMatrixSum);
        });

        it(`doesn't change the score when recieves a left or right move`, () => {
            game.setBoardValues(initialMatrix);
            expect(game.getScore()).toEqual(0);
            game.moveTiles(Move.RIGHT);
            expect(game.getScore()).toEqual(0);
            game.moveTiles(Move.LEFT);
            expect(game.getScore()).toEqual(0);

            const initialMatrixSum = calcMatrixSum(initialMatrix);
            expect(calcMatrixSum(game.getBoardValues())).toEqual(initialMatrixSum);
        });
    });

});
