import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Stepperui from "./steppers";


const Paymentt = () => {
    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
    const { userData } = useSelector((state) => state.custom2);
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const {totalPrice} = orderInfo
    const amount = Math.round(orderInfo.totalPrice * 100)


         


    const checkoutHandler = async () => {

        const config = { headers: {"Content-Type": "application/json" }, withCredentials: true };
        const { data: { RAZORPAY_API_KEY } } = await axios.post("http://localhost:5500/api/v1/razorpayApiKey",{},config)

        const { data: { order } } = await axios.post("http://localhost:5500/api/v1/checkout", {amount},config)

        const options = {
            RAZORPAY_API_KEY,
            amount: amount,
            currency: "INR",
            name: userData.name,
            description: "Tutorial of RazorPay",
            image: userData.avatar.url,
            order_id: order.id,
            callback_url: "http://localhost:5500/api/v1/paymentverification",
            prefill: {
                name: userData.name,
                email: userData.email,
                // contact: "9999999999"
            },
            notes: {
                "address": "Razorpay Corporate Office"
            },
            theme: {
                "color": "#121212"
            }
        };
        const razor = new window.Razorpay(options);
        razor.open();
    }
  return (
    <>
    <Stepperui activeStep={2}/>
    <div className="min-h-screen flex flex-col justify-center items-center">
        <img src="https://leadershipmemphis.org/wp-content/uploads/2020/08/780370.png" width="300px" className="mb-5" alt="" />
    <button onClick={checkoutHandler} className=" rounded-full px-5 text-white py-3 fs-5" style={{backgroundColor:"#1976d2",fontFamily:"Roboto"}}>Pay: ₹{totalPrice}</button>
    </div>
    
    </>
  )
}

export default Paymentt