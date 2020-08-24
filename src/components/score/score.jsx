import React from "react";
import PropTypes from "prop-types";

const Score = ({title, points, newPoints}) => {

    return (
    <div className="box">
        <h3 className="subsection-title">{title} score: </h3>
        <p className="subsection-title game-score">
            {points}
            {newPoints > 0 && (<span key={Math.random()} className="new-points">{` + ${newPoints}`}</span>)}
        </p>
    </div>
    )
};

Score.propTypes = {
    title: PropTypes.string.isRequired,
    points: PropTypes.number.isRequired,
    newPoints: PropTypes.number
};

export default Score;
