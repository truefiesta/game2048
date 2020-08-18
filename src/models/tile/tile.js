const EMPTY_VALUE = 0;

class Tile {
    constructor(value = EMPTY_VALUE) {
        this._value = value;
    }

    setValue(value) {
        this._value = value;
    }

    getValue() {
        return this._value;
    }

    isEmpty() {
        return this._value === EMPTY_VALUE;
    }
}

export default Tile;