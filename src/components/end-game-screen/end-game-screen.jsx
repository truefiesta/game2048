import React from "react";
import PropTypes from "prop-types";

const EndGameScreen = ({isGameEnded, score}) => {
    if (!isGameEnded) {
        return null;
    }

    return (
    <div className="game-over-container">
        <h3>Game finished<br />with the score: <span>{score}</span></h3>
        <p>Press the button below to start a new game.</p>
    </div>
    );
};

EndGameScreen.propTypes = {
    isGameEnded: PropTypes.bool.isRequired,
    score: PropTypes.number.isRequired
};

export default EndGameScreen;