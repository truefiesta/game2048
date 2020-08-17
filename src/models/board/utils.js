export const getRandomNumber = (maxNotIncluded) => {
    return Math.floor(Math.random() * maxNotIncluded); 
};

export const getRandomMatrixElementCoordinates = (matrixSize) => {
    const x = getRandomNumber(matrixSize);
    const y = getRandomNumber(matrixSize);
    return {x, y};
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
    let mergedTilesSum = 0;
    for (let i = movedValues.length-1; i > 0; i--) {
        if (movedValues[i] === movedValues[i - 1]) {
            movedValues[i] = movedValues[i] * 2;
            mergedTilesSum += movedValues[i];
            movedValues[i - 1] = 0;
        }
    }
    return [moveArrayValues(movedValues), mergedTilesSum];
};

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

export const checkMergeAbilityInColumns = (initialMatrix) => {
    const matrix = Array.from(initialMatrix);
    return matrix.some((column) => {
        return column.some((element, index) => {
            if (index < column.length - 1) {
                return element === column[index + 1];
            }
        });
    });
};

export const checkMergeAbility = (matrix) => {
    const turnedMatrix = turnMartixRight(matrix);
    return checkMergeAbilityInColumns(matrix) || checkMergeAbilityInColumns(turnedMatrix);
}

export const calcMatrixSum = (matrix) => {
    return matrix.reduce((acc, column) => {
        return acc + column.reduce((sum, value) => {
            return sum + value;
        }, 0)
    }, 0);
};
