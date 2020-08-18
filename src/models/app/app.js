import Game from "../game/game";
import {Move} from "../../const";

class App {
    constructor(boardSize, bestScore) {
        this._init(boardSize, bestScore);
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

    resetGame() {
        this._game = new Game(this._boardSize);
    }

    _init(boardSize, bestScore) {
        this._boardSize = boardSize;
        this._bestScore = bestScore;
        this._game = new Game(this._boardSize);
    }
}

export default App;
