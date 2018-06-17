let React = require('react');
let Form = require('./Form.jsx');
let CardList = require('./CardList.jsx');

class App extends React.Component {

    state = {
        cards: []
    };

    addCard = (userData) => {

        this.setState(prevState => ({
            cards: prevState.cards.concat(userData)
        }));
    };

    render() {
        return (
            <div>
                <Form onSubmit={this.addCard} />
                <CardList cards={this.state.cards}/>
            </div>
        );
    };
}

module.exports = App;