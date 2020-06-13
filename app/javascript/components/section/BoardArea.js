import React from "react"
import axios from 'axios';

import "./BoardArea.css"
import BoogleBoard from "../common/BoogleBoard"
import BoardControl from "../common/BoardControl"
import PlayerInput from "../common/PlayerInput"
import ScoreArea from "./ScoreArea";
import {GAME_DURATION, MIN_WORD_LEN} from "../../constants";

class BoardArea extends React.Component {
    constructor(props) {
        super(props);
        this.refTextInput = React.createRef();
        this.refScoreTable = React.createRef();
        this.state = {
            isGameStarted: false,
            timeRemaining: GAME_DURATION,
            gameInfo: {
                id: -1,
                boogle_string: "ABCDABCDABCDABCD"
            },
            history: {
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
            isGameStarted: !state.isGameStarted,
            inputWord: "",
        }));

        if (this.state.isGameStarted) {
            this.resetTimer(false);

        } else {
            this.resetTimer();
            this.setState(state => ({
                history: {}
            }));
        }

    }

    handleResetClick() {
        this.resetTimer(this.state.isGameStarted);
        this.setState(state => ({
            inputWord: "",
            history: {}
        }));

    }

    handleNewGameClick() {
        this.getNewGameFromApi()
        this.resetTimer(false);
        this.setState(state => ({
            inputWord: "",
            history: {}
        }));
    }

    handleInputWordChange(word) {
        this.setState({inputWord: word});
    }

    handleWordSubmit( event) {
        const inputWord = this.state.inputWord.trim();
        const history = this.state.history;

        if (!(inputWord in history) && inputWord.length >= MIN_WORD_LEN) {
            const gameId=this.state.gameInfo.id;
            this.getScoreFromApi(inputWord, gameId);
        }

        this.setState({inputWord: ""});
        // event.preventDefault();
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
                    <PlayerInput ref={this.refTextInput} inputWord={this.state.inputWord} onWordSubmit={this.handleWordSubmit}
                                 isGameStarted={this.state.isGameStarted}
                                 onInputWordChange={this.handleInputWordChange}/>
                </div>
                <ScoreArea ref={this.refScoreTable} history={this.state.history}/>
            </div>
        );
    }

    componentWillMount() {
        this.getNewGameFromApi();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.refTextInput.current.focus();

        const scoreTable  = this.refScoreTable.current;
        scoreTable.scrollTo(0, 20*(Object.keys(this.state.history).length+1));
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
            this.setState({
                isGameStarted: false,
                inputWord: ""
            })
        }
    }

}


export default BoardArea