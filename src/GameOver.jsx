let React = require('react');

const GameOver = (props) => {

    const calculateScore = () => {
        let secondsLeft = props.secondsLeft <= 0 ? 1 : props.secondsLeft;
        let refreshLeft = props.refreshLeft <= 0 ? 1 : props.refreshLeft;
        return (
            props.usedNums.length *
            props.usedNums.length *
            props.usedNums.length *
            props.usedNums.length + secondsLeft * refreshLeft * 30
        );
    };

    return (
        <div className="text-center">
            <h2>{props.doneStatus}</h2>
            <br/>
            <h4>Score: {calculateScore()}</h4>
            <button className="btn btn-secondary"
                    onClick={props.resetGame} >
                Play Again
            </button>
        </div>
    );
};

module.exports = GameOver;