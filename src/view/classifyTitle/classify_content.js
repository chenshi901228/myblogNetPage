import React, { useEffect } from 'react'


export default function ClassifyContent(props) {
    useEffect(() => {
        console.log(props)
    }, [])
    return (
        <div>
            ClassifyContent
        </div>
    )
}