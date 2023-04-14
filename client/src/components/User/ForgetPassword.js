import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { forgetPassword } from '../../slices/passwordResetSlice'
import { Backdrop } from '@mui/material'
import Backlog from '../Loading/Backlog'

const ForgetPassword = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { error, isLoading, message } = useSelector((state) => state.custom3)
    const [email, setEmail] = useState("")
    const [send, setSend] = useState("Send")
    const [messageShow, setMessage] = useState("")
    const [color, setColor] = useState("blue")

    const handleChange = (e) => {

        setEmail(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(forgetPassword({ email }))
    }



    useEffect(() => {
        if (isLoading) {
            setSend("Sending.....")
        }
        else {
            setSend("Send")
        }
        if (message) {
            setMessage(message)
            setColor("blue")
            setInterval(() => {
                setMessage("")
            }, 3000);
        }
        if (error) {
            setColor("red")
            setMessage(error)
            setInterval(() => {
                setMessage("")
            }, 3000);
           
        }
    }, [isLoading,message,error,color])
    return (

        <>

            <div className="flex items-center min-h-screen p-4 bg-gray-100 lg:justify-center">
                <div
                    className="flex flex-col overflow-hidden bg-white rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-md"
                >
                    <div
                        className="p-4 py-6 text-white bg-blue-500 md:w-80 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-evenly"
                    >
                        <div className="my-3 text-4xl font-bold tracking-wider text-center">
                            <a href="#">ECommerse</a>
                        </div>
                        <p className="mt-6 font-normal text-center text-gray-300 md:mt-0">
                            With the power of K-WD, you can now focus only on functionaries htmlFor your digital products, while leaving the
                            UI design on us!
                        </p>

                    </div>
                    <div className="p-5 bg-white md:flex-1">
                        <h3 className="my-4 text-2xl font-semibold text-gray-700">Forgot Password</h3>

                        <form method='post' action="" className="flex flex-col space-y-5" onSubmit={handleSubmit}>
                            <div className="flex flex-col space-y-1">
                                <label htmlFor="email" className="text-sm font-semibold text-gray-500">Email address</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={email}
                                    required
                                    autoFocus
                                    onChange={handleChange}
                                    className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                                />
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4"
                                >
                                    {send}
                                </button>
                            </div>
                            <div>
                                {(message || error) ? (<h1 style={{color:`${color}`}}>{messageShow}</h1>) : null}
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ForgetPassword