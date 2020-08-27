import Game from "../game/game";
import {Move} from "../../const";

const defaultSnapshot = {
    bestScore: 0,
    boardSize: 4,
};

class App {
    constructor(snapshot) {
        if (!snapshot) {
            snapshot = defaultSnapshot;
        }

        this._boardSize = snapshot.boardSize;
        this._bestScore = snapshot.bestScore;
        this._game = new Game(this._boardSize);
        if(snapshot.boardValues && !snapshot.gameEnded) {
            this._game.setBoardValues(snapshot.boardValues);
            this._game.setScore(snapshot.score || 0);
        }
    }

    getBoardSize() {
        return this._boardSize;
    }

    getBestScore() {
        return this._bestScore;
    }

    getGame() {
        return this._game;
    }

    getSnapshot() {
        return {
            score: this._game.getScore(),
            bestScore: this._bestScore,
            boardSize: this._boardSize,
            boardValues: this._game.getBoardValues(),
            gameEnded: this._game.hasEnded()
        }
    }

    _updateBestScore() {
        if (this._bestScore < this._game.getScore()) {
            this._bestScore = this._game.getScore();
        }
    }

    _move(direction) {
        this._game.move(direction);
        this._updateBestScore();
    }

    moveDown() {
        this._move(Move.DOWN);
    }

    moveUp() {
        this._move(Move.UP);
    }

    moveRight() {
        this._move(Move.RIGHT);
    }

    moveLeft() {
        this._move(Move.LEFT);
    }

    resetGame(boardSize) {
        this._boardSize = boardSize;
        this._game = new Game(this._boardSize);
    }
}

export {defaultSnapshot};
export default App;
