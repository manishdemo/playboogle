import React from "react"
import BoardArea from "./BoardArea"
import "./GameArea.css"
import {ScoreArea} from "./ScoreArea";

class GameArea extends React.Component {
    render() {
        return (
            <div className="game-area">
                <BoardArea/>
                <ScoreArea/>
            </div>
        )
    }
}

export default GameArea