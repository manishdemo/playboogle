import React from "react"
import axios from 'axios';

import "./BoardArea.css"
import BoogleBoard from "../common/BoogleBoard"
import BoardControl from "../common/BoardControl"
import PlayerInput from "../common/PlayerInput"
import ScoreArea from "./ScoreArea";
import {GAME_DURATION} from "../../constants";

class BoardArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isGameStarted: false,
            timeRemaining: GAME_DURATION,
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

        if (this.state.isGameStarted) {
            this.resetTimer(false);

        } else {
            this.resetTimer();
        }
    }

    handleResetClick() {
        this.resetTimer(this.state.isGameStarted);
    }

    handleNewGameClick() {
        this.getNewGameFromApi()
        this.resetTimer(false);
    }

    resetTimer(toStartTimer=true) {
        if (this.timerID) {
            clearInterval(this.timerID);
            this.timerID = null;
        }
        this.setState(state => ({
            timeRemaining: GAME_DURATION
        }));

        if (toStartTimer) {
            this.timerID = setInterval(
                () => this.tick(),
                1000
            );
        }
    }

    render() {
        return (
            <div className="game-area">
                <div className="board-area">
                    <BoardControl onClick={this.handleGameStartStopClick} gameStarted={this.state.isGameStarted}
                                  onClick1={this.handleResetClick}
                                  onClickNewGame={this.handleNewGameClick}
                                  timeRemaining={this.state.timeRemaining}/>
                    <BoogleBoard boogleString={this.state.gameInfo.boogle_string}/>
                    <PlayerInput/>
                </div>
                <ScoreArea/>
            </div>
        );
    }

    componentDidMount() {
        this.getNewGameFromApi();
    }

    getNewGameFromApi( extra_callback ) {
        axios.get(`start`)
            .then(res => {
                const response = res.data;
                this.setState({gameInfo: response});
                // console.log( "callback of api call of componentDidMount: " + this.state.gameInfo.boogle_string)
                this.setState(  {isGameStarted: false})
            })
    }

    // componentMountCallback = () => {
    //     this.setState(  {isGameStarted: false})
    // };
    //
    // newGameCallback = () => {
    //     this.setState(  {isGameStarted: false})
    // };

    tick() {
        this.setState({
            timeRemaining: this.state.timeRemaining-1
        });

        if (this.state.timeRemaining == 0) {
            clearInterval(this.timerID);
            this.setState(  {isGameStarted: false})
        }
    }

}


export default BoardArea