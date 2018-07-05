let React = require('react');

const Answer = (props) => {
    return (
        <div className="col-5">
            {props.selectedNums.map((number, i) =>
                <span onClick={() => {props.removeNumber(number)}} key={i}>{number}</span>
            )}
        </div>
    );
};

module.exports = Answer;