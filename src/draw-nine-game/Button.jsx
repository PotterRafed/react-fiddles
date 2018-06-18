
let React = require('react');


const Button = (props) => {

    let button;

    switch(props.answerIsCorrect) {
        case true:
            button =
                <button className="btn btn-success btn"
                        onClick={props.acceptAnswer} >
                    <i className="fa fa-check"></i>
                </button>
            break;
        case false:
            button =
                <button className="btn btn-danger btn"
                        onClick={props.clearAnswer} >
                    <i className="fa fa-times"></i>
                </button>
            break;
        default:
            button =
                <button onClick={props.checkAnswer}
                        className="btn btn-primary btn"
                        disabled={props.selectedNums.length === 0}>
                    =
                </button>
    }

    return (
        <div className="col-2 text-center">
            {button}
            <br /><br />
            <button onClick={() => {props.refresh()}}
                    className="btn btn-warning btn-sm"
                    disabled={props.refreshLeft == 0}>
                <i className="fa fa-sync-alt"></i> {props.refreshLeft}
            </button>
        </div>

    );
};

module.export = Button;