let React = require('react');
let Card = require('./Card.jsx');

const CardList = (props) => {
    return (
        <div>
            {props.cards.map(card => <Card key={card.id} {...card}/>)}
        </div>
    );
};

module.exports = CardList;