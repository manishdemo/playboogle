import React from "react"
import "./BoardArea.css"
import BoogleBoard from "../common/BoogleBoard"
import BoardControl from "../common/BoardControl"
import PlayerInput from "../common/PlayerInput"

class BoardArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isGameStarted: true};

        // This binding is necessary to make `this` work in the callback
        this.handleGameStartStopClick = this.handleGameStartStopClick.bind(this);
        this.handleResetClick = this.handleResetClick.bind(this);
    }

    handleGameStartStopClick() {
        this.setState(state => ({
            isGameStarted: !state.isGameStarted
        }));
    }

    handleResetClick() {
        this.setState(state => ({
            // isGameStarted: !state.isGameStarted
            // TODO : to reset the game.
        }));
    }


    render() {
        const time_remaining = 'Time Remaining: MM:SS';
        return (
            <div className="board-area">
                <BoardControl onClick={this.handleGameStartStopClick} gameStarted={this.state.isGameStarted}
                              onClick1={this.handleResetClick} timeRemaining={time_remaining}/>
                <BoogleBoard/>
                <PlayerInput/>
            </div>
        );
    }
}


export default BoardArea