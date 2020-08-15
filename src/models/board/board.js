import Tile from "../tile/tile";

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

const getRandomNumber = (maxNotIncluded) => {
    return Math.floor(Math.random() * maxNotIncluded); 
};

const getRandomMatrixElementCoordinates = (matrixSize) => {
    const x = getRandomNumber(matrixSize);
    const y = getRandomNumber(matrixSize);
    return {x, y};
};

const generateRandomTileValue = (step) => {
    if (step === 0) {
        return Math.random() < 0.1 ? 4 : 2;
    }
};

const moveArrayValues = (values) => {
    const newValues = Array(values.length).fill(0);
    let nextIndexInNewValues = values.length - 1;
    for (let i = values.length - 1; i >= 0; i--) { 
        if (!(values[i] === 0)) {
            newValues[nextIndexInNewValues] = values[i];
            nextIndexInNewValues--;
        }
    }

    return newValues;
};

const moveAndMergeValues = (values) => {
    const movedValues = moveArrayValues(values);
    for (let i = movedValues.length-1; i > 0; i--) {
        if (movedValues[i] === movedValues[i - 1]) {
            movedValues[i] = movedValues[i] * 2;
            movedValues[i - 1] = 0;
        }
    }
    return moveArrayValues(movedValues);
}

const turnMartixRight = (matrix) => {
    const turnedMatrix = [];
    const size = matrix.length;

    for (let j = 0; j < size; j++) {
        turnedMatrix[j] = [];
        let z = size - 1 - j;
        for (let i = 0; i < size; i++) {
            turnedMatrix[j][i] = matrix[i][z];
        }
    }

    return turnedMatrix;
};

const turnMatrixLeft = (matrix) => {
    const size = matrix.length;
    const turnedMatrix = [];

    for (let j = 0; j < size; j++) {
    turnedMatrix[j] = [];
    for (let i = 0; i < size; i++) {
        let z = size - 1 - i;
        turnedMatrix[j][i] = matrix[z][j]
        }
    }

    return turnedMatrix;
};

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

export {BoardSize, BoardSizeToInitialFilledTilesNumber, generateRandomTileValue, Move, moveArrayValues, turnMartixRight, turnMatrixLeft, moveAndMergeValues};
export default Board;