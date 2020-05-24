import React from "react"
import axios from 'axios';

import "./BoardArea.css"
import BoogleBoard from "../common/BoogleBoard"
import BoardControl from "../common/BoardControl"
import PlayerInput from "../common/PlayerInput"
import ScoreArea from "./ScoreArea";

class BoardArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isGameStarted: true,
            gameInfo: {
                boogle_string: "ABCDABCDABCDABCD"
            }
        };

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
            <div className="game-area">
                <div className="board-area">
                    <BoardControl onClick={this.handleGameStartStopClick} gameStarted={this.state.isGameStarted}
                                  onClick1={this.handleResetClick} timeRemaining={time_remaining}/>
                    <BoogleBoard boogleString={this.state.gameInfo.boogle_string}/>
                    <PlayerInput/>
                </div>
                <ScoreArea/>

            </div>
        );
    }

    componentDidMount() {
        axios.get(`http://localhost:3000/api/start`)
            .then(res => {
                const response = res.data;
                this.setState({ gameInfo: response});
                console.log( "callback of api call: " + this.state.gameInfo.boogle_string)

            })
    }
}


export default BoardArea