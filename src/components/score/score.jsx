import React from "react";
import PropTypes from "prop-types";

const Score = ({title, points}) => {
    return (
    <div className="box">
        <h3 className="subsection-title">{title} score: </h3>
        <p className="subsection-title game-score">{points}</p>
    </div>
    )
};

Score.propTypes = {
    title: PropTypes.string.isRequired,
    points: PropTypes.number.isRequired,
};

export default Score;
