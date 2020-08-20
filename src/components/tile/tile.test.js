import React from "react";
import renderer from "react-test-renderer";
import Tile from "./tile";

describe(`Tile snapshot`, () => {
    it(`renders with 0`, () => {
        const tile = renderer.create(
            <Tile
                value={0}
            />
        )
        .toJSON();

        expect(tile).toMatchSnapshot();
    });

    it(`renders with 2048`, () => {
        const tile = renderer.create(
            <Tile
                value={2048}
            />
        )
        .toJSON();

        expect(tile).toMatchSnapshot();
    });
});
