import Tile from "../tile/tile";
import {getRandomMatrixElementCoordinates, turnMartixRight, turnMatrixLeft, moveAndMergeValues, getRandomInt, checkMergeAbility, isNotTheSameMatrix} from "./utils";
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

    getEmptyTiles() {
        const emptyTiles = [];
        this._matrix.forEach((column) => {
            column.forEach((tile) => {
                if (tile.isEmpty()) {
                    emptyTiles.push(tile);
                }
            });
        });
        return emptyTiles;
    }

    hasEmptyTiles() {
        return this._matrix.some((column) => {
            return column.some((tile) => tile.isEmpty());
        })
    }

    hasValue(value) {
        const matrixWithValues = this.getMatrix();
        return matrixWithValues.some((column) => {
            return column.some((element) => element === value);
        })
    }

    hasTilesToMerge() {
        return checkMergeAbility(this.getMatrix());
    }

    setValueOnRandomEmptyTile(value) {
        const emptyTiles = this.getEmptyTiles();
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

        const isTilesPositionChanged = isNotTheSameMatrix(initialMatrix, newMatrix);
        this.setMatrix(newMatrix);

        return {isTilesPositionChanged, mergedTilesSum};
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

    _getMaxTilesNumber() {
        return this._size * this._size;
    }

    _init(initialValues) {
        this._matrix = createInitialMatrix(this._size);
        let counter = 0;
        const target = initialValues.length;
        if (target > this._getMaxTilesNumber()) {
            throw `Too many initial values`;
        }
        
        while (counter < target) {
            const {x, y} = getRandomMatrixElementCoordinates(this._size);
            const randomTile = this._matrix[x][y];
            if (randomTile.isEmpty()) {
                randomTile.setValue(initialValues[counter]);
                counter++;
            }
        }
    }
}

export default Board;