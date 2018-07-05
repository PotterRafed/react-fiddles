let React = require('react');

const Timer = (props) => {
    return (
        <div className="text-center">
            <h4>Time left: {props.secondsLeft}s</h4>
        </div>
    );
}

module.exports = Timer;