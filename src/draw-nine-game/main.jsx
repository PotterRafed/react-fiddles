
import React from "react";
import ReactDOM from "react-dom";

let Game = require('./Game.jsx');

class App extends React.Component {
    render() {
        return (
            <div>
                <Game />
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('content')
);