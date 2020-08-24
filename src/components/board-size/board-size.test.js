import React from "react";
import renderer from "react-test-renderer";
import BoardSize from "./board-size";

describe(`BoardSize snapshot`, () => {
    it(`renders`, () => {
        const boardSize = renderer.create(
            <BoardSize
                size={4}
                onSelect={() => null}
            />
        )
        .toJSON();

        expect(boardSize).toMatchSnapshot();
    });
});
