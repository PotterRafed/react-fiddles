let React = require('react');
let _ = require('lodash');

const Stars = (props) => {

    return (
        <div className="col-5">
            {_.range(props.numberOfStars).map(i =>
                <i key={i} className="fa fa-star"></i>
            )}
        </div>
    );
};

module.exports = Stars;