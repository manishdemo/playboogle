import React from "react"
import GameIntro from "./section/GameIntro";
import GameArea from "./section/GameArea";
import ContactInfo from "./section/ContactInfo";

class BooglePage extends React.Component {
    render() {
        return (
            <div>
                <GameIntro/>
                <GameArea/>
                <ContactInfo/>
            </div>
        )
    }

}


export default BooglePage