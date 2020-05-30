import React from "react";
import "./ScoreArea.css";

export class ScoreArea extends React.Component {
    render() {
        const history = this.props.history;
        let total_score = 0;

        const scores = Object.entries(history).map(
            ([word, score]) => {
                total_score += score;
                return (
                    <tr key={word}>
                        <td>{word}</td>
                        <td>{score}</td>
                    </tr>
                )
            }
        )



        return (
            <div className="score-area">
                <h1 align={"center"}> Score Board </h1>
                <table>
                    <tbody>
                        <tr>
                            <th>Word</th>
                            <th>Point</th>
                        </tr>
                        {scores}
                    </tbody>
                </table>
                <br/>
                <br/>
                <div className={"total-score"}>
                    Total Score: {total_score}
                </div>
            </div>
        )
    }
}

export default ScoreArea
