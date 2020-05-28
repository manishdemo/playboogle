import React from "react";
import "./PlayerInput.css"

class PlayerInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        alert('A word was submitted: ' + this.state.value);
        event.preventDefault();
    }

    render() {
        return (
            <div >
                <br/>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Your word:
                        <input type="text" value={this.state.value} onChange={this.handleChange} className="word-input" />
                    </label>
                    <input type="submit" value="Submit" className="word-submit" />
                </form>
            </div>
        );
    }
}

export default PlayerInput