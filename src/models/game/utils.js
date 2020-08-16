export const generateRandomTileValue = (step) => {
    if (step === 0) {
        return Math.random() < 0.1 ? 4 : 2;
    }
};
