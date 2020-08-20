import React from "react";
import renderer from "react-test-renderer";
import Board from "./board";

describe(`Board snapshot`, () => {
    it(`renders`, () => {
        const tileValues = [0, 0, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 2, 2];
        const board = renderer.create(
            <Board
                tileValues={tileValues}
            />
        )
        .toJSON();

        expect(board).toMatchSnapshot();
    });
});