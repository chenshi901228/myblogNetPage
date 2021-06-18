
import { useState, useEffect } from 'react'

export default function User() {
    const [count, setCount] = useState(0);
    const [age, setAge] = useState(18)
    useEffect(() => {
        console.log("componentdidmount")
    }, [])
    useEffect(() => {
        console.log("update")
    }, [age])
    useEffect(() => {
        return function clean() {
            console.log("clean")
        }
    }, [])
    return (
        <div>
            <p>user:{count}</p>
            <p>age:{age}</p>
            <button onClick={() => setCount(count + 1)}>click</button>
        </div>
    )
}