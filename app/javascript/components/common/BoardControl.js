import React from "react";
import * as PropTypes from "prop-types";
import "./BoardControl.css";

function TimeDisplayMMSS(props) {
    const time_remaining = Math.floor(props.timeRemaining/60).toString().padStart(2,'0') + ":" +
        (props.timeRemaining%60).toString().padStart(2,'0') ;

    return <div>
        <br/>
        <div className="time_remaining"> Time Remaining: {time_remaining}</div>
        <br/>
    </div>;
}

TimeDisplayMMSS.propTypes = {timeRemaining: PropTypes.string};

export class BoardControl extends React.Component {
    render() {

        return (
            <div id="container">
                <button onClick={this.props.onClick} className="btnGameStartStop">
                    {this.props.gameStarted ? "Stop Game" : "Start Game"}
                </button>

                <div className="divider"/>

                <button onClick={this.props.onClick1} className="btnSingleText">
                    Reset
                </button>

                <div className="divider"/>
                <button onClick={this.props.onClickNewGame} className="btnSingleText">
                    New Game
                </button>


                <TimeDisplayMMSS timeRemaining={this.props.timeRemaining}/>

            </div>
        );
    }
}

BoardControl.propTypes = {
    onClick: PropTypes.func,
    gameStarted: PropTypes.bool,
    onClick1: PropTypes.func,
    timeRemaining: PropTypes.number
};

export default BoardControl