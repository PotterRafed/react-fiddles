let React = require('react');

const Card = (props) => {
    return (
        <div>
            <img width="75" src={props.avatar_url} />
            <div style={{display: 'inline-block', margin: 10}}>
                <div style={{fontSize: '1.25em', fontWeight: 'bold'}}>{props.name}</div>
                <div>{props.company}</div>
            </div>
        </div>
    );
};

module.exports = Card;