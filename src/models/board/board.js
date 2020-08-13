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

const moveColumnTiles = (column, direction) => {
    const newColumn = Array.from(Array(column.length), () => new Tile());

    if (direction === Move.DOWN) {
        console.log(`down down down`);
        let nextIndexInNewColumn = column.length - 1;
        for (let i = column.length - 1; i >= 0; i--) { 
            if (!column[i].isEmpty()) {
                newColumn[nextIndexInNewColumn] = column[i];
                nextIndexInNewColumn--;
            }
        }
    }

    return newColumn;
};

class Board {
    constructor(size) {
        this._size = size;
        this._matrix = this._createInitialMatrix(size);
        this._init();
    }

    getColumn(column) {
        return this._matrix[column].map((tile) => {
            return tile.getValue();
        });
    }

    setColumn(column, values) {
        this._matrix[column].forEach((tile, index) => {
            tile.setValue(values[index]);
        });
    }

    moveTiles(direction) {
        if (direction === Move.DOWN) {
            this._matrix.forEach((column, i) => {
                this._matrix[i] = moveColumnTiles(column, direction);
            })
        }
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

export {BoardSize, BoardSizeToInitialFilledTilesNumber, generateRandomTileValue, Move};
export default Board;