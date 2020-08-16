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

class Game {
    constructor() {
        this._score = 0;
    }

    getScore() {
        return this._score;
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
}

export default Game;
