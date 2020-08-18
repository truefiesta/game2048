import {generateRandomTileValue} from "./utils";
import Board from "../board/board";

const BoardSize = {
    SMALL_BOARD: 8,
    MEDIUM_BOARD: 16
};

const BoardSizeToInitialFilledTilesNumber = {
    [BoardSize.SMALL_BOARD]: 2,
    [BoardSize.MEDIUM_BOARD]: 4
};

const WINNING_VALUE = 2048;

class Game {
    constructor(boardSize) {
        this._start(boardSize);
    }

    getStep() {
        return this._step;
    }

    getScore() {
        return this._score;
    }

    hasWin() {
        return this._hasWin;
    }

    hasEnded() {
        return this._hasEnded;
    }

    setScore(newScore) {
        this._score = newScore;
    }

    setBoardValues(values) {
        this._board.setMatrix(values);
    }

    getBoardValues() {
        return this._board.getMatrix();
    }

    checkWin() {
        return this._board.hasValue(WINNING_VALUE);
    }

    _incScore(newPoints) {
        this._score += newPoints;
    }

    _incStepByOne() {
        this._step++;
    }

    _isNextMovePossible() {
        return this._board.hasEmptyTiles() || this._board.hasTilesToMerge();
    }

    move(direction) {
        if(!this._hasEnded) {
            const {isTilesPositionChanged, mergedTilesSum} = this._board.moveTiles(direction);
            if (isTilesPositionChanged) {
                this._incScore(mergedTilesSum);
                if (!this._hasWin) {
                    this._hasWin = this._board.hasValue(WINNING_VALUE);
                }
                this._incStepByOne();
                const newValueForEmptyTile = generateRandomTileValue(this._step);
                this._board.setValueOnRandomEmptyTile(newValueForEmptyTile);
                if (!this._isNextMovePossible()) {
                    this._end();
                }
            }
        }
    }

    _getNumberOfTilesForInitialFill() {
        let numberOfTilesToFill;
        if (this._size <= BoardSize.SMALL_BOARD) {
            numberOfTilesToFill = BoardSizeToInitialFilledTilesNumber[BoardSize.SMALL_BOARD];
        } else {
            numberOfTilesToFill = BoardSizeToInitialFilledTilesNumber[BoardSize.MEDIUM_BOARD]
        }

        return numberOfTilesToFill;
    }

    _getInitialValuesForNonEmptyTiles() {
        const numberOfTilesToFill = this._getNumberOfTilesForInitialFill();
        const initialNonEmptyTileValues = [];
        for (let i = 0; i < numberOfTilesToFill; i++) {
            initialNonEmptyTileValues.push(generateRandomTileValue());
        }

        return initialNonEmptyTileValues;
    }

    _initializeBoard(boardSize) {
        const initialNonEmptyTileValues = this._getInitialValuesForNonEmptyTiles();
        this._board = new Board(boardSize, initialNonEmptyTileValues);
    }

    _start(boardSize) {
        this._hasWin = false;
        this._hasEnded = false;
        this._score = 0;
        this._step = 0;
        this._initializeBoard(boardSize);
    }

    _end() {
        this._hasEnded = true;
    }
}

export {BoardSize, BoardSizeToInitialFilledTilesNumber};
export default Game;
