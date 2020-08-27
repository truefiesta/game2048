import React, {PureComponent} from "react";
import PropTypes from "prop-types";

class BoardSize extends PureComponent {
    constructor(props) {
        super(props);
        this._onSizeChange = this._onSizeChange.bind(this);
    }

    _onSizeChange(evt) {
        this.props.onSelect(parseInt(evt.target.value, 10));
    }

    render() {
        return (
            <div className="board-size">
                <label className="subsection-title" htmlFor="size-select">Board size: </label>
                <select onChange={this._onSizeChange} value={this.props.size} name="size" id="size-select" className="size-select">
                    <option value="4">4 * 4</option>
                    <option value="8">8 * 8</option>
                </select>
            </div>
        );
    } 
}

BoardSize.propTypes = {
    size: PropTypes.number.isRequired,
    onSelect: PropTypes.func.isRequired
};

export default BoardSize;
