import Tile from "./tile";

describe(`Tile class`, () => {
    it(`can create an empty tile`, () => {
        const tile = new Tile();

        expect(tile.isEmpty()).toEqual(true);
    });

    it(`can set and get tile value`, () => {
        const initialValue = 2;
        const tile = new Tile(initialValue);

        expect(tile.getValue()).toEqual(initialValue);

        const newValue = 4;
        tile.setValue(newValue)
        expect(tile.getValue()).toEqual(newValue);
    });
});