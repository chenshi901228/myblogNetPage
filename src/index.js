import React from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter } from "react-router-dom";
import 'antd/dist/antd.css'


import App from './view/home'
// import App from './view/test'

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.querySelector("#root")
)