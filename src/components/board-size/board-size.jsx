import React from "react";

const BoardSize = () => {
    return (
        <div className="board-size">
            <label className="subsection-title" htmlFor="size-select">Board size: </label>
            <select name="size" id="size-select" className="size-select">
                <option value="4">4 * 4</option>
                <option value="8">8 * 8</option>
            </select>
        </div>
    )
};

export default BoardSize;
