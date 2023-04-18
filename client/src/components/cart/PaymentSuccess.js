import CheckIcon from '@mui/icons-material/Check';
import React from 'react'
import { Link, useSearchParams } from "react-router-dom"
const PaymentSuccess = () => {

    const seachQuery = useSearchParams()[0]

    const referenceNum = seachQuery.get("reference")
    return (
        <>
            <div className="min-h-screen flex flex-col justify-center md-justify-start items-center">

                <img src="https://t.ly/l7wi" width="500px" alt="" />
                <div className='flex flex-col justify-center items-center'>
                <h1 className='fs-1 mb-2'>Payment Success</h1>
                <p>Reference No:  {referenceNum}</p>
                </div>
                <Link to="/" style={{backgroundColor:"#1976d2"}} className='rounded-full px-3 py-2 text-white fs-5 mt-4'>Continue Shopping</Link>
                
            </div>

        </>

    )
}

export default PaymentSuccess