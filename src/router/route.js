

import React, { Component } from 'react'
import { Route } from "react-router-dom";



import Home from '../view/home'
// import Home from '../view/home'
// import My from '../view/my'

export default class extends Component {
    render() {
        return (
            <div>
                <Route exact path="/" component={Home} />
                {/* <Route path="/home" component={Home} />
                <Route path="/my" component={My} /> */}
            </div>
        )
    }
}
