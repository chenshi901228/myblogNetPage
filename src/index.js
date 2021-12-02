import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'

import reportWebVitals from './reportWebVitals';
import 'antd/dist/antd.css'


import App from './view/home'
// import App from './router/route'

ReactDOM.render(
    <Router>
        <App />
    </Router>,
    document.querySelector("#root")
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
