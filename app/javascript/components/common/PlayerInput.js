import React from "react";
import "./PlayerInput.css"

class PlayerInput extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.props.onInputWordChange(event.target.value)
    }

    handleSubmit(event) {
        if (this.props.isGameStarted) {
            this.props.onWordSubmit(event);
        }
        event.preventDefault();
    }

    render() {
        const inputWord = this.props.inputWord;
        return (
            <div >
                <br/>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Your word:
                        <input type="text" value={inputWord} onChange={this.handleChange}
                               disabled = {(this.props.isGameStarted)? "" : "disabled"}
                               ref={this.props.innerRef}
                               className="word-input" />
                    </label>
                    <input type="submit" value="Submit" className="word-submit" />
                </form>
            </div>
        );
    }
}

// export default PlayerInput
export default React.forwardRef( (props, ref) => <PlayerInput
    innerRef={ref} {...props}
    />

);