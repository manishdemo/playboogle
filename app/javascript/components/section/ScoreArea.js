import React from "react";
import "./ScoreArea.css";

export class ScoreArea extends React.Component {
    render() {
        const history = this.props.history;
        let total_score = 0;

        const scores = history.map(word_score => {
            total_score += word_score[1];
            return  (
                <tr key={word_score[0]}>
                    <td>{word_score[0]}</td>
                    <td>{word_score[1]}</td>
                </tr>
            )
        });

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
