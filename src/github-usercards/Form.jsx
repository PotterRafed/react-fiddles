
let React = require('react');
let Axios = require('axios');

class Form extends React.Component {

    state = {
        username: ""
    };

    handleSubmit = (event) => {
        event.preventDefault();
        Axios.get(`https://api.github.com/users/${this.state.username}`)
            .then(resp => {
                this.props.onSubmit(resp.data);
                this.setState({username: ""});
            });

    };

    handleOnChange = (event) => {
        this.setState({
            username: event.target.value
        });
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input
                    type="text"
                    value={this.state.username}
                    onChange={this.handleOnChange}
                    placeholder="Github username" />
                <button type="submit">Add card</button>
            </form>
        );
    };
}

module.exports = Form;