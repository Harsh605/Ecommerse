import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Navigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { resetPassword } from '../../slices/passwordResetSlice';

const ResetPassword = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { token } = useParams()


    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [messageShow, setMessage] = useState("")
    const [update, setUpdate] = useState("Update")
    const [color, setColor] = useState("blue")

    const { isUpdated, isLoading, message, error } = useSelector((state) => state.custom3)
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(resetPassword({ token, password, confirmPassword }))
    }


    useEffect(() => {
        if (isLoading) {
            setUpdate("Updating.....")
        }
        else {
            setUpdate("Update")
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
        if (isUpdated) {
            setTimeout(() => {
                navigate("/login")
            }, 3000)
        }
    }, [navigate, message,isUpdated, isLoading, error, color])
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
                        <h3 className="my-4 text-2xl font-semibold text-gray-700">Reset Password</h3>

                        <form method='post' action="" className="flex flex-col space-y-5" onSubmit={handleSubmit}>
                            <div className="flex flex-col space-y-1">

                            </div>
                            <div className="flex flex-col space-y-1">
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="text-sm font-semibold text-gray-500" >Password</label>
                                </div>
                                <input
                                    type="password"
                                    required
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                                />
                            </div>
                            <div className="flex flex-col space-y-1">
                                <div className="flex items-center justify-between">
                                    <label htmlFor="Confirm Password" className="text-sm font-semibold text-gray-500" >Password</label>
                                </div>
                                <input
                                    type="password"
                                    required
                                    name="confirmPassword"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                                />
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4"
                                >
                                    {update}
                                </button>
                            </div>
                            <div>
                                {(message || error) ? (<h1 style={{ color: `${color}` }}>{messageShow}</h1>) : null}
                            </div>

                        </form>
                    </div>
                </div>
            </div>



        </>
    )
}

export default ResetPassword