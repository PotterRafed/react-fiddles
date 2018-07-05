let React = require('react');
let Button = require('./Button.jsx');
let Answer = require('./Answer.jsx');
let Numbers = require('./Numbers.jsx');
let Stars = require('./Stars.jsx');
let Timer = require('./Timer.jsx');
let GameOver = require('./GameOver.jsx');
let _ = require('lodash');


let possibleCombinationSum = function(arr, n) {
    if (arr.indexOf(n) >= 0) { return true; }
    if (arr[0] > n) { return false; }
    if (arr[arr.length - 1] > n) {
        arr.pop();
        return possibleCombinationSum(arr, n);
    }
    let listSize = arr.length, combinationsCount = (1 << listSize)
    for (let i = 1; i < combinationsCount ; i++ ) {
        let combinationSum = 0;
        for (let j=0 ; j < listSize ; j++) {
            if (i & (1 << j)) { combinationSum += arr[j]; }
        }
        if (n === combinationSum) { return true; }
    }
    return false;
};

class Game extends React.Component {

    static randomNumber = () => 1+ Math.floor(Math.random()*9);

    static initialState = () => ({
        selectedNums: [],
        usedNums: [],
        numberOfStars: Game.randomNumber(),
        answerIsCorrect: null,
        refreshLeft:  5,
        doneStatus: null,
        secondsLeft: 30
    });

    constructor() {
        super();
        this.state = Game.initialState();
        this.state.intervalId = this.startTimer();
    }

    countDown = () => {
        this.setState(prevState => ({
            secondsLeft: prevState.secondsLeft - 1
        }), this.updateDoneStatus);
    };

    stopTimer = (id) => {
        clearInterval(id);
    };

    startTimer = () => {
        return setInterval(this.countDown, 1000)
    };

    selectNumber = (clickedNumber) => {
        if (this.state.selectedNums.indexOf(clickedNumber) < 0 &&
            this.state.usedNums.indexOf(clickedNumber) < 0
        ) {
            this.setState(prevState => ({
                answerIsCorrect: null,
                selectedNums: prevState.selectedNums.concat(clickedNumber)
            }));
        }
    };

    removeNumber = (clickedNumber) => {
        this.setState(prevState => ({
            answerIsCorrect: null,
            selectedNums: _.pull(prevState.selectedNums, clickedNumber)
        }));
    };

    checkAnswer = () => {
        this.setState(prevState => ({
            answerIsCorrect: (_.sum(prevState.selectedNums) === prevState.numberOfStars)
        }));
    };

    clearAnswer = () => {
        this.setState(prevState => ({
            selectedNums: [],
            answerIsCorrect: null
        }));
    };

    acceptAnswer = () => {
        this.setState(prevState => ({
            answerIsCorrect: null,
            usedNums: _.concat(prevState.usedNums, prevState.selectedNums),
            selectedNums: [],
            numberOfStars: Game.randomNumber()
        }), this.updateDoneStatus);
    };

    resetGame = () => {
        let newState = Game.initialState();
        newState.intervalId = this.startTimer();
        this.setState(newState)
    };

    refresh = () => {
        if (this.state.refreshLeft === 0) {return;}
        this.setState(prevState => ({
            answerIsCorrect: null,
            selectedNums: [],
            numberOfStars: Game.randomNumber(),
            refreshLeft: prevState.refreshLeft - 1
        }), this.updateDoneStatus);
    };

    updateDoneStatus = () => {
        this.setState(prevState => {
            if (prevState.usedNums.length === 9) {
                this.stopTimer(this.state.intervalId);
                return {doneStatus: "CONGRATULATIONS! You Won!"};
            }
            if (prevState.refreshLeft === 0 && !this.possibleSolutions(prevState)) {
                this.stopTimer(this.state.intervalId);
                return { doneStatus: "Game Over! You ran out of solutions"};
            }
            if (prevState.secondsLeft <= 0) {
                this.stopTimer(this.state.intervalId);
                return { doneStatus: "Game Over! Time ran out!"};
            }
        });
    };

    possibleSolutions = ({numberOfStars, usedNums}) => {

        const possibleNums = _.range(1, 10).filter(number =>
            usedNums.indexOf(number) === -1
        );
        // console.log(possibleNums, numberOfStars);
        return possibleCombinationSum(possibleNums, numberOfStars);
    };

    render() {

        const {
            selectedNums,
            numberOfStars,
            answerIsCorrect,
            usedNums,
            refreshLeft,
            doneStatus,
            secondsLeft
        } = this.state;

        return (
            <div className="container">
                <h3>Draw Nine</h3>
                <hr/>
                <div className="row">

                    {!doneStatus && <Stars numberOfStars={numberOfStars}
                    />}

                    {!doneStatus && <Button selectedNums={selectedNums}
                                            numberOfStars={numberOfStars}
                                            checkAnswer={this.checkAnswer}
                                            answerIsCorrect={answerIsCorrect}
                                            acceptAnswer={this.acceptAnswer}
                                            refreshLeft={refreshLeft}
                                            refresh={this.refresh}
                                            clearAnswer={this.clearAnswer}
                    />}
                    {!doneStatus && <Answer selectedNums={selectedNums}
                                            removeNumber={this.removeNumber}
                    /> }
                </div>
                <br />

                {doneStatus ?
                    <GameOver doneStatus={doneStatus}
                              resetGame={this.resetGame}
                              usedNums={usedNums}
                              secondsLeft={secondsLeft}
                              refreshLeft={refreshLeft}
                    /> :

                    <Numbers selectedNums={selectedNums}
                             selectNumber={this.selectNumber}
                             usedNums={usedNums}
                    />
                }
                <br /><br />
                {!doneStatus && <Timer secondsLeft={secondsLeft}
                />}

            </div>
        );
    }
}

module.exports = Game;