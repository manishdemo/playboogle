import React from "react";
import * as PropTypes from "prop-types";
import "./BoardControl.css";

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



                <div>
                    <br/>
                    <div className="time_remaining">{this.props.timeRemaining}</div>
                    <br/>
                </div>

            </div>
        );
    }
}

BoardControl.propTypes = {
    onClick: PropTypes.func,
    gameStarted: PropTypes.bool,
    onClick1: PropTypes.func,
    timeRemaining: PropTypes.string
};

export default BoardControl