import React from "react";
import renderer from "react-test-renderer";
import Score from "./score";
import {ScoreType} from "../../const";

describe(`Score snapshot`, () => {
    it(`renders with Game title`, () => {
        const score = renderer.create(
            <Score
                title={ScoreType.GAME}
                points={0}
                newPoints={0}
            />
        )
        .toJSON();

        expect(score).toMatchSnapshot();
    });

    it(`renders with Best title`, () => {
        const score = renderer.create(
            <Score
                title={ScoreType.BEST}
                points={3408}
            />
        )
        .toJSON();

        expect(score).toMatchSnapshot();
    });
});
