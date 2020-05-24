import React from "react"
import GameIntro from "./section/GameIntro";
import ContactInfo from "./section/ContactInfo";
import BoardArea from "./section/BoardArea";

class BooglePage extends React.Component {
    render() {
        return (
            <div>
                <GameIntro/>
                <BoardArea/>
                <ContactInfo/>
            </div>
        )
    }

}


export default BooglePage