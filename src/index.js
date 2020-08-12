import React from "react";
import ReactDOM from "react-dom";
import Board from "./components/board";
import './css/styles.css';

console.log('Hi!');

const App = () => {
    return (
        <Board/>
    );
};

ReactDOM.render(<App />, document.getElementById('board'));
