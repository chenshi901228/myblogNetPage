
import React, { useState,useEffect } from 'react'


export default function Hello(props) {
    useEffect(()=>{
        let localLogin = localStorage.getItem("userInfo")
        if(localLogin!=null){
            props.history.replace("/user")
        }
    },[])
    return (
        <p>hello,wolcome to my blog</p>
    )
}