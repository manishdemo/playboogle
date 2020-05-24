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
            isGameStarted: false,
            gameInfo: {
                id: -1,
                boogle_string: "ABCDABCDABCDABCD"
            }
        };

        // This binding is necessary to make `this` work in the callback
        this.handleGameStartStopClick = this.handleGameStartStopClick.bind(this);
        this.handleResetClick = this.handleResetClick.bind(this);
        this.handleNewGameClick = this.handleNewGameClick.bind(this);
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

    handleNewGameClick() {
        this.getNewGameFromApi(this.newGameCallback)
    }

    render() {
        const time_remaining = 'Time Remaining: MM:SS';

        return (
            <div className="game-area">
                <div className="board-area">
                    <BoardControl onClick={this.handleGameStartStopClick} gameStarted={this.state.isGameStarted}
                                  onClick1={this.handleResetClick}
                                  onClickNewGame={this.handleNewGameClick}
                                  timeRemaining={time_remaining}/>
                    <BoogleBoard boogleString={this.state.gameInfo.boogle_string}/>
                    <PlayerInput/>
                </div>
                <ScoreArea/>

            </div>
        );
    }

    componentDidMount() {
        this.getNewGameFromApi(this.componentMountCallback);
    }

    getNewGameFromApi( extra_callback ) {
        axios.get(`http://localhost:3000/api/start`)
            .then(res => {
                const response = res.data;
                this.setState({gameInfo: response});
                // console.log( "callback of api call of componentDidMount: " + this.state.gameInfo.boogle_string)
                extra_callback()
            })
    }

    componentMountCallback = () => {
        this.setState(  {isGameStarted: false})
    };

    newGameCallback = () => {
        this.setState(  {isGameStarted: false})
    };

}


export default BoardArea