import React, {Component, Fragment} from "react";
import AppModel from "../../models/app/app";
import BoardSize from "../board-size/board-size";
import Board from "../board/board";
import NewGameButton from "../new-game-button/new-game-button";
import Score from "../score/score";
import {ScoreType} from "../../const";
import EndGameScreen from "../end-game-screen/end-game-screen";

class App extends Component {
    constructor(props) {
        super(props);
        this._app = new AppModel(JSON.parse(localStorage.getItem(`snapshot`)));

        this.state = {
            score: this._app.getGame().getScore(),
            bestScore: this._app.getBestScore(),
            boardValues: this._app.getGame().getBoardValues(),
        }

        this._actions = {
            moveUp: this._moveUp.bind(this),
            moveDown: this._moveDown.bind(this),
            moveRight: this._moveRight.bind(this),
            moveLeft: this._moveLeft.bind(this),
        };

        this._reset = this._reset.bind(this);
    }

    _updateState() {
        this.setState({
            score: this._app.getGame().getScore(),
            bestScore: this._app.getBestScore(),
            boardValues: this._app.getGame().getBoardValues(),
        })
        localStorage.setItem(`snapshot`, JSON.stringify(this._app.getSnapshot()));
    }

    _moveUp() {
        this._app.moveUp();
        this._updateState();
    }

    _moveDown() {
        this._app.moveDown();
        this._updateState();
    }
    
    _moveRight() {
        this._app.moveRight();
        this._updateState();
    }

    _moveLeft() {
        this._app.moveLeft();
        this._updateState();
    }

    _reset() {
        this._app.resetGame();
        this._updateState();
    }

    render() {
        return (
            <Fragment>
                <EndGameScreen 
                    isGameEnded={this._app.getGame().hasEnded()}
                    score={this.state.score}
                />
                <section className={`new-game-container ${this._app.getGame().hasEnded() ? `game-over` : ``} box`}>
                    <BoardSize />
                    <NewGameButton 
                        onReset={this._reset}
                    />
                </section>
                <section className="score">
                    <Score
                        title={ScoreType.GAME}
                        points={this.state.score}
                        newPoints={this._app.getGame().getNewPoints()}
                    />
                    <Score
                        title={ScoreType.BEST}
                        points={this.state.bestScore}
                    />
                </section>
                <Board
                    matrix={this.state.boardValues}
                    actions={this._actions}
                />
            </Fragment>
        );
    }
};

export default App;
