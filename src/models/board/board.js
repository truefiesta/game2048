import Tile from "../tile/tile";
import {getRandomMatrixElementCoordinates, turnMartixRight, turnMatrixLeft, moveAndMergeValues, getRandomInt, checkMergeAbility} from "./utils";
import {Move} from "../../const";

const createInitialMatrix = (rows, cols = rows) => {
    const matrix = [];
    for (let i = 0; i < rows; i++) {
        matrix[i] = [];
        for (let j = 0; j < cols; j++) {
            matrix[i][j] = new Tile();
        }
    }
    
    return matrix;
};

class Board {
    constructor(size, initialValues) {
        this._size = size;
        this._init(initialValues);
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
        let mergedTilesSum = 0;
        if (direction === Move.DOWN) {
            newMatrix = initialMatrix.map((column) => {
                const mergeResult = moveAndMergeValues(column);
                mergedTilesSum += mergeResult[1];
                return mergeResult[0];
            });
        }

        if (direction === Move.UP) {
            newMatrix = initialMatrix.map((column) => {
                const reversedColumn = Array.from(column).reverse();
                const mergeResult = moveAndMergeValues(reversedColumn);
                const columnWithMovedValues = mergeResult[0];
                mergedTilesSum += mergeResult[1];
                return columnWithMovedValues.reverse();
            });
        }

        if (direction === Move.RIGHT) {
            const matrixTurnedRight = turnMartixRight(initialMatrix);
            const matrixTurnedRightWithMovedValues = matrixTurnedRight.map((column) => {
                const mergeResult = moveAndMergeValues(column)
                mergedTilesSum += mergeResult[1];
                return mergeResult[0];
            });
            newMatrix = turnMatrixLeft(matrixTurnedRightWithMovedValues);
        }

        if (direction === Move.LEFT) {
            const matrixTurnedLeft = turnMatrixLeft(initialMatrix);
            const matrixTurnedLeftWithMovedValues = matrixTurnedLeft.map((column) => {
                const mergeResult = moveAndMergeValues(column);
                mergedTilesSum += mergeResult[1];
                return mergeResult[0];
            });
            newMatrix = turnMartixRight(matrixTurnedLeftWithMovedValues);
        }

        this.setMatrix(newMatrix);

        return mergedTilesSum;
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