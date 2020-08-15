import Game from "./game";

describe(`Game class`, () => {
    it(`can create a new game`, () => {
        const game = new Game();

        expect(game.getScore()).toEqual(0);
    });
});