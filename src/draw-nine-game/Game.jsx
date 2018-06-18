let React = require('react');

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
        doneStatus: null
    });

    state = Game.initialState();

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

    resetGame = () => this.setState(Game.initialState());

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
                return {doneStatus: "You Won!"};
            }
            if (prevState.refreshLeft === 0 && !this.possibleSolutions(prevState)) {
                return { doneStatus: "Game Over!"};
            }
        });
    };

    possibleSolutions = ({numberOfStars, usedNums}) => {

        const possibleNums = _.range(1, 10).filter(number =>
            usedNums.indexOf(number) === -1
        );
        return possibleCombinationSum(possibleNums, numberOfStars);
    };

    render() {

        const {
            selectedNums,
            numberOfStars,
            answerIsCorrect,
            usedNums,
            refreshLeft,
            doneStatus
        } = this.state;

        return (
            <div className="container">
                <h3>Play Nine</h3>
                <hr/>
                <div className="row">

                    <Stars numberOfStars={numberOfStars}
                    />

                    <Button selectedNums={selectedNums}
                            numberOfStars={numberOfStars}
                            checkAnswer={this.checkAnswer}
                            answerIsCorrect={answerIsCorrect}
                            acceptAnswer={this.acceptAnswer}
                            refreshLeft={refreshLeft}
                            refresh={this.refresh}
                            clearAnswer={this.clearAnswer}
                    />
                    <Answer selectedNums={selectedNums}
                            removeNumber={this.removeNumber}
                    />
                </div>
                <br />

                {doneStatus ?
                    <GameOver doneStatus={doneStatus}
                              resetGame={this.resetGame}
                    /> :

                    <Numbers selectedNums={selectedNums}
                             selectNumber={this.selectNumber}
                             usedNums={usedNums}
                    />
                }
            </div>
        );
    }
}

module.export = Game;