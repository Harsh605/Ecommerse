import React, { useEffect,useState } from 'react'

const Demo = () => {

    const [number, setNumber] = useState(0)

    console.log("first")
    useEffect(() => {
        console.log("hello")
        // console.log(number)
        setNumber(number + 1)
        console.log(number)
    },[])
    console.log("hey")

    return (
        <div>Hey</div>
    )
}

export default Demo