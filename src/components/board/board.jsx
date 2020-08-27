import React, {useCallback, useEffect} from "react";
import PropTypes from "prop-types";
import Tile from "../tile/tile";

const Board = ({size, matrix, actions}) => {
    const values = matrix.reduce((acc, curColumn) => {
        return acc.concat(curColumn);
    }, []);

    const keyDownHandler = useCallback((evt) => {
        evt.preventDefault();
        switch(evt.key) {
            case `ArrowUp`:
                actions.moveUp();
                break;
            case `ArrowDown`:
                actions.moveDown();
                break;
            case `ArrowRight`:
                actions.moveRight();
                break;
            case `ArrowLeft`:
                actions.moveLeft();
                break;
        }
      }, [actions]);

    useEffect(() => {
        document.addEventListener("keydown", keyDownHandler, false);
    
        return () => {
            document.removeEventListener("keydown", keyDownHandler, false);
        };
    }, [actions]);

    return (
        <section className={`board board-${size} box`}>
            {values.map((value, i) => {
                return <Tile key={i} value={value}/>
            })}
        </section>
    )
};

Board.propTypes = {
    size: PropTypes.number.isRequired,
    matrix: PropTypes.arrayOf(
        PropTypes.arrayOf(
            PropTypes.number.isRequired
        ).isRequired
    ).isRequired,
    actions: PropTypes.shape({
        moveUp: PropTypes.func.isRequired,
        moveDown: PropTypes.func.isRequired,
        moveRight: PropTypes.func.isRequired,
        moveLeft: PropTypes.func.isRequired,
    }).isRequired
}

export default Board;
