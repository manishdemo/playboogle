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
            },
            history: {
                "cat": 1,
                "zebra": 2
            },

            inputWord:""

        };

        // This binding is necessary to make `this` work in the callback
        this.handleGameStartStopClick = this.handleGameStartStopClick.bind(this);
        this.handleResetClick = this.handleResetClick.bind(this);
        this.handleNewGameClick = this.handleNewGameClick.bind(this);
        this.handleInputWordChange = this.handleInputWordChange.bind(this);
        this.handleWordSubmit = this.handleWordSubmit.bind(this);
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

    handleInputWordChange(word) {
        this.setState({inputWord: word});
    }

    handleWordSubmit( event) {
        const inputWord = this.state.inputWord;
        const history = this.state.history;

        if (!(inputWord in history)) {
            const gameId=this.state.gameInfo.id;
            this.getScoreFromApi(inputWord, gameId);
        }

        this.setState({inputWord: ""});
        event.preventDefault();
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
                    <PlayerInput inputWord={this.state.inputWord} onWordSubmit={this.handleWordSubmit}
                                 onInputWordChange={this.handleInputWordChange}/>
                </div>
                <ScoreArea history={this.state.history}/>
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
                this.setState(  {isGameStarted: false})
            })
    }

    getScoreFromApi(inputWord, gameId) {
        axios.get('score', {params: {id: gameId, word: inputWord} })
            .then(res => {
                if (res && res.status == 200) {
                    const response = res.data;

                    if (response.score>0) {
                        const history = this.state.history;
                        this.setState({
                            history: {
                                ...history,
                                [inputWord]: response.score
                            }
                            }
                        )
                    }
                }
            }
            )

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