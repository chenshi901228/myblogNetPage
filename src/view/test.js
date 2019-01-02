import React, { Component } from 'react'


export default class extends Component {
    state = {
        count: 1
    }
    render() {
        return (
            <div>
                <p>{this.state.count}</p>
                <button onClick={() => {
                    console.log("a")
                    this.setState({
                        count:this.state.count+1
                    })
                }}>点击</button>
            </div>
        )
    }
}