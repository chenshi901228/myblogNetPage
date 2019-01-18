import React from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter,HashRouter } from "react-router-dom";
import 'antd/dist/antd.css'


import App from './view/home'

ReactDOM.render(
    <HashRouter>
        <App />
    </HashRouter>,
    document.querySelector("#root")
)