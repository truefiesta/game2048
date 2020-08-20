import React from "react";
import renderer from "react-test-renderer";
import NewGameButton from "./new-game-button";

describe(`NewGameButton snapshot`, () => {
    it(`renders`, () => {
        const newGameButton = renderer.create(
            <NewGameButton/>
        )
        .toJSON();

        expect(newGameButton).toMatchSnapshot();
    });
});
