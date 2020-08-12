import React from "react";
import renderer from "react-test-renderer";
import Board from "./board";

describe(`Board snapshot`, () => {
    it(`renders`, () => {
        const board = renderer.create(
            <Board/>
        )
        .toJSON();

        expect(board).toMatchSnapshot();
    });
});