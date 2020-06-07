import React from "react"
import "./BoogleBoard.css"
import * as PropTypes from "prop-types";

class Square extends React.Component {
    render() {
        return (
            <button className="square">
                {this.props.value}
            </button>
        );
    }
}

class BoogleBoard extends React.Component {

    renderSquare(i) {
        return <Square value={this.props.boogleString[i]}  />;
    }

    render() {
        // console.log("In Boogle Board Render")
        let boogleString = this.props.boogleString;
        // console.log(boogleString.charAt(0))
        return (
            <div className="boogle-board">
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                    {this.renderSquare(3)}
                </div>
                <div className="board-row">
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                </div>
                <div className="board-row">
                    {this.renderSquare(8)}
                    {this.renderSquare(9)}
                    {this.renderSquare(10)}
                    {this.renderSquare(11)}
                </div>
                <div className="board-row">
                    {this.renderSquare(12)}
                    {this.renderSquare(13)}
                    {this.renderSquare(14)}
                    {this.renderSquare(15)}
                </div>

            </div>
        );
    }

}

BoogleBoard.propTypes = {
    boogleString: PropTypes.string
};

export default BoogleBoard