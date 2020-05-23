import React from "react"
import "./GameIntro.css"


class GameIntro extends React.Component {
    render() {
        return (
            <div className="game-intro">
                <h1>Boogle Game</h1>
                <div>
                    <p>
                        Boggle is a popular word game invented by Allan Turoff and originally distributed by Parker
                        Brothers. It is played with 16 dice labeled with one letter of the alphabet on each side. The
                        dice are shaken and dropped randomly into a four-by-four grid so that only the letters on the
                        top faces are visible.
                    </p>
                    <p>
                        The objective is to find sequences of adjacent letters (horizontally, vertically, or diagonally
                        adjacent) that form English words. Boggle can be an excellent vehicle for helping children to
                        learn new words.
                    </p>
                    <p>
                        Here is a simple online version of the game for a single player. It is developed in React and
                        Ruby on Rails. Please enjoy!
                    </p>
                </div>
            </div>
        )
    }
}

export default GameIntro