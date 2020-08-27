import React from "react";
import PropTypes from "prop-types";

const Tile = ({value}) => {
    return (
        <div className={`tile tile-${value}`}>
            <span>{value}</span>
        </div>
    )
};

Tile.propTypes = {
    value: PropTypes.number.isRequired,
}

export default Tile;
