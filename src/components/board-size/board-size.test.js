import React from "react";
import renderer from "react-test-renderer";
import BoardSize from "./board-size";

describe(`BoardSize snapshot`, () => {
    it(`renders`, () => {
        const boardSize = renderer.create(
            <BoardSize/>
        )
        .toJSON();

        expect(boardSize).toMatchSnapshot();
    });
});
