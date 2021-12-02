

import React, { Component } from 'react'
import { Route, Switch } from "react-router-dom";

import Hello from '../view/hello';
import User from '../view/user/user';
import ClassifyTitleList from '../view/classifyTitle/classifyTitle_list';
import ClassifyContent from '../view/classifyTitle/classify_content'

export default class Routes extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={Hello} />
                <Route path="/user" component={User} />
                <Route path="/classifyTitleList" component={ClassifyTitleList} />
                <Route path="/classifyContent" component={ClassifyContent} />
            </Switch>
        )
    }
}
