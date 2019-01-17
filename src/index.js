import React from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter } from "react-router-dom";
import 'antd/dist/antd.css'


import App from './view/home'

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.querySelector("#root")
)