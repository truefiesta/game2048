import React, {Fragment} from "react";
import ReactDOM from "react-dom";
import BoardSize from "./components/board-size/board-size";
import Board from "./components/board/board";
import NewGameButton from "./components/new-game-button/new-game-button";
import Score from "./components/score/score";
import {ScoreType} from "./const";
import './css/styles.css';

const tileValues = [0, 0, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 2, 2];

const App = () => {
    return (
        <Fragment>
            <section className="new-game-container box">
                <BoardSize />
                <NewGameButton />
            </section>
            <section className="score">
                <Score
                    title={ScoreType.GAME}
                    points={0}
                />
                <Score
                    title={ScoreType.BEST}
                    points={0}
                />
            </section>
            <Board
                tileValues={tileValues}
            />
        </Fragment>
    );
};

ReactDOM.render(<App />, document.getElementById('game'));
