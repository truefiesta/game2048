export const getRandomNumber = (maxNotIncluded) => {
    return Math.floor(Math.random() * maxNotIncluded); 
};

export const getRandomMatrixElementCoordinates = (matrixSize) => {
    const x = getRandomNumber(matrixSize);
    const y = getRandomNumber(matrixSize);
    return {x, y};
};

export const generateRandomTileValue = (step) => {
    if (step === 0) {
        return Math.random() < 0.1 ? 4 : 2;
    }
};

export const moveArrayValues = (values) => {
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

export const moveAndMergeValues = (values) => {
    const movedValues = moveArrayValues(values);
    for (let i = movedValues.length-1; i > 0; i--) {
        if (movedValues[i] === movedValues[i - 1]) {
            movedValues[i] = movedValues[i] * 2;
            movedValues[i - 1] = 0;
        }
    }
    return moveArrayValues(movedValues);
}

export const turnMartixRight = (matrix) => {
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

export const turnMatrixLeft = (matrix) => {
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

export const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
};
