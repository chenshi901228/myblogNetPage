import React from 'react'
import ReactDOM from 'react-dom'

import { HashRouter } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import 'antd/dist/antd.css'


import App from './view/home'

ReactDOM.render(
    <HashRouter>
        <App />
    </HashRouter>,
    document.querySelector("#root")
)
  
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
