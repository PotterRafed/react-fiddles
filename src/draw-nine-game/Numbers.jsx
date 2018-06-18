let React = require('react');

const Numbers = (props) => {

    const numberClassName = (number) => {

        if (props.usedNums.indexOf(number) >= 0) {
            return 'used';
        }

        if (props.selectedNums.indexOf(number) >= 0) {
            return 'selected';
        }
    };

    return (
        <div className="card text-center">
            <div>
                {Numbers.numbersList.map((number, i) =>
                    <span key={i}
                          onClick={() => {props.selectNumber(number)}}
                          className={numberClassName(number)}>{number}
                    </span>
                )}
            </div>
        </div>
    );
};
Numbers.numbersList = _.range(1, 10);

module.export = Numbers;