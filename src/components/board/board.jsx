import React from "react";
import PropTypes from "prop-types";
import Tile from "../tile/tile";

const Board = ({tileValues}) => {
    return (
        <section className="board box">
            {tileValues.map((tileValue, i) => {
                return <Tile key={i} value={tileValue}/>
            })}
        </section>
    )
};

Board.propTypes = {
    tileValues: PropTypes.arrayOf(PropTypes.number).isRequired,
}

export default Board;