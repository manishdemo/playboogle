import React from 'react'
import BooglePage from "./BooglePage"

import "./style.css"
import axios from 'axios';
import {API_URL} from "../constants";

axios.defaults.baseURL = API_URL

class App extends React.Component {
    render() {
        return (
            <BooglePage />
            )
    }
}

export default App