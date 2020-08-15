import Tile from "../tile/tile";
import {getRandomMatrixElementCoordinates, generateRandomTileValue, turnMartixRight, turnMatrixLeft, moveAndMergeValues, getRandomInt} from "./utils";

const BoardSize = {
    SMALL_BOARD: 8,
    MEDIUM_BOARD: 16
};

const BoardSizeToInitialFilledTilesNumber = {
    [BoardSize.SMALL_BOARD]: 2,
    [BoardSize.MEDIUM_BOARD]: 4
};

const Move = {
    DOWN: `down`,
    UP: `up`,
    LEFT: `left`,
    RIGHT: `right`,
}

class Board {
    constructor(size) {
        this._size = size;
        this._matrix = this._createInitialMatrix(size);
        this._init();
    }

    getMatrix() {
        return this._matrix.map((_, i) => {
            return this.getColumn(i);
        })
    }

    getColumn(column) {
        return this._matrix[column].map((tile) => {
            return tile.getValue();
        });
    }

    setMatrix(values) {
        if (this._size !== values.length) {
            throw `Wrong number of columns: ${values.length}`;
        } else {
            for (let i = 0; i < values.length; i++) {
                if (values[i].length !== this._size) {
                    throw `Wrong number of rows in column${i}: ${values[i].length}`;
                }
            }
        }

        for (let i = 0; i < this._matrix.length; i++) {
            this.setColumn(i, values[i]);
        }
    }

    setColumn(column, values) {
        this._matrix[column].forEach((tile, index) => {
            tile.setValue(values[index]);
        });
    }

    setValueOnRandomEmptyTile(value) {
        const emptyTiles = [];
        this._matrix.forEach((column) => {
            column.forEach((tile) => {
                if (tile.isEmpty()) {
                    emptyTiles.push(tile);
                }
            });
        });
 
        const randomIndex = getRandomInt(emptyTiles.length);
        emptyTiles[randomIndex].setValue(value);
    }

    moveTiles(direction) {
        const initialMatrix = this.getMatrix();
        let newMatrix = [];
        if (direction === Move.DOWN) {
            newMatrix = initialMatrix.map((column) => moveAndMergeValues(column));
        }

        if (direction === Move.UP) {
            newMatrix = initialMatrix.map((column) => {
                const reversedColumn = Array.from(column).reverse();
                const columnWithMovedValues = moveAndMergeValues(reversedColumn);
                return columnWithMovedValues.reverse();
            });
        }

        if (direction === Move.RIGHT) {
            const matrixTurnedRight = turnMartixRight(initialMatrix);
            const matrixTurnedRightWithMovedValues = matrixTurnedRight.map((column) => moveAndMergeValues(column));
            newMatrix = turnMatrixLeft(matrixTurnedRightWithMovedValues);
        }

        if (direction === Move.LEFT) {
            const matrixTurnedLeft = turnMatrixLeft(initialMatrix);
            const matrixTurnedLeftWithMovedValues = matrixTurnedLeft.map((column) => moveAndMergeValues(column));
            newMatrix = turnMartixRight(matrixTurnedLeftWithMovedValues);
        }

        this.setMatrix(newMatrix);
    }

    getSize() {
        return this._size;
    }

    countFilledTiles() {
        let counter = 0;
        for (let i = 0; i < this._size; i++) {
            for (let j = 0; j < this._size; j++) {
                if (!this._matrix[i][j].isEmpty()) {
                    counter++;
                }
            }
        }

        return counter;
    }

    _createInitialMatrix(rows, cols = rows) {
        const matrix = [];
        for (let i = 0; i < rows; i++) {
            matrix[i] = [];
            for (let j = 0; j < cols; j++) {
                matrix[i][j] = new Tile();
            }
        }
        
        return matrix;
    }

    _getTilesNumberForInitialFill() {
        let numberOfTilesToFill;
        if (this._size <= BoardSize.SMALL_BOARD) {
            numberOfTilesToFill = BoardSizeToInitialFilledTilesNumber[BoardSize.SMALL_BOARD];
        } else {
            numberOfTilesToFill = BoardSizeToInitialFilledTilesNumber[BoardSize.MEDIUM_BOARD]
        }

        return numberOfTilesToFill;
    }

    _init() {
        let counter = 0;
        const step = 0;
        const target = this._getTilesNumberForInitialFill();
        while (counter < target) {
            const randomTileCoordinates = getRandomMatrixElementCoordinates(this._size);
            const {x, y} = randomTileCoordinates;
            const randomTile = this._matrix[x][y];
            if (randomTile.isEmpty()) {
                counter++;
                randomTile.setValue(generateRandomTileValue(step));
            }
        }
    }

}

export {BoardSize, BoardSizeToInitialFilledTilesNumber, Move};
export default Board;