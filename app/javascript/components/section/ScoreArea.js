import React from "react";
import "./ScoreArea.css";

export class ScoreArea extends React.Component {
    render() {
        return (
            <div className="score-area">
                <h1 align={"center"}> Score Board </h1>
                <table>
                    <tr>
                        <th>Word</th>
                        <th>Point</th>
                    </tr>
                    <tr>
                        <td>Apple</td>
                        <td>2</td>
                    </tr>
                    <tr>
                        <td>Ball</td>
                        <td>1</td>
                    </tr>
                    <tr>
                        <td>Cat</td>
                        <td>1</td>
                    </tr>
                </table>
                <br/>
                <br/>
                <div className={"total-score"}>
                    Total Score: 4
                </div>
            </div>
        )
    }
}

export default ScoreArea
