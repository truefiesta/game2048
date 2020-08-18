import App from "./app";

describe(`App class`, () => {
    let app;
    const boardSize = 4;
    const bestScore = 0;

    beforeEach(() => {
        app = new App(boardSize, bestScore);
    })

    it(`can create a new app`, () => {
        expect(app.getBoardSize()).toEqual(boardSize);
        expect(app.getBestScore()).toEqual(bestScore);
    });

    it(`starts a new game when the app is created`, () => {
        expect(app.getGame()).toBeDefined();
    });

    it(`updates the best score after every move`, () => {
        const initialMatrix = [
            [1, 5, 9, 13],
            [2, 6, 10, 14],
            [19, 17, 100, 15],
            [20, 100, 16, 16]
        ];
        app.getGame().setBoardValues(initialMatrix);
        expect(app.getBestScore()).toEqual(0);
        app.moveDown();
        expect(app.getBestScore()).toEqual(32);
        app.moveRight();
        expect(app.getBestScore()).toEqual(232);
    });

    it(`allows to reset the game at any time`, () => {
        const initialMatrix = [
            [0, 0, 9, 13],
            [2, 6, 10, 14],
            [19, 17, 100, 15],
            [20, 100, 16, 16]
        ];

        const initialGame = app.getGame();
        initialGame.setBoardValues(initialMatrix);
        app.moveDown();
        app.moveRight();
        expect(initialGame.getStep()).toBeGreaterThan(0);
        app.resetGame();
        const newGame = app.getGame();
        expect(newGame).not.toEqual(initialGame);
        expect(newGame.getStep()).toEqual(0);
    });
});
