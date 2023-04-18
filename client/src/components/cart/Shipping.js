import React from 'react'
import { Country, State, City } from "country-state-city";
import Stepperui from './steppers';
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingInfo } from '../../slices/addToCartSlice';
import { useNavigate } from 'react-router-dom';


const Shipping = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { shippingInfo } = useSelector((state) => state.custom4);

    const [Name, setName] = useState(shippingInfo.address);
    const [address, setAddress] = useState(shippingInfo.address);
    const [city, setCity] = useState(shippingInfo.city);
    const [state, setState] = useState(shippingInfo.state);
    const [country, setCountry] = useState(shippingInfo.country);
    const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);
    const [email, setEmail] = useState(shippingInfo.email);

    const shippingSubmit = (e) => {
        e.preventDefault();

        if (phoneNo.length < 10 || phoneNo.length > 10) {
            console.log("Phone Number should be 10 digits Long");
            return;
        }
        dispatch(
            saveShippingInfo({ Name, address, city, state, country, pinCode, phoneNo, email })
        );
        navigate("/order/confirm");
    };
    

    return (
        <>
            <Stepperui activeStep={0} />

            <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
                <div className="container max-w-screen-lg mx-auto">
                    <div>

                        <div className="p-4 px-4 md:p-8 mb-6">
                            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                                <div className="text-gray-600">
                                    <p className="font-medium text-lg">Shipping Details</p>
                                    <p>Please fill out all the fields.</p>
                                </div>

                                <div className="lg:col-span-2">
                                    <form  encType="multipart/form-data" onSubmit={shippingSubmit} >
                                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                                        <div className="md:col-span-5">
                                            <label htmlFor="full_name">Full Name</label>
                                            <input type="text" name="Name" placeholder='Name' id="full_name" required className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value={Name} onChange={(e) => setName(e.target.value)} />
                                        </div>

                                        <div className="md:col-span-5">
                                            <label htmlFor="email">Email Address</label>
                                            <input type="text" name="email" id="email" required className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value={email} placeholder="email@domain.com" onChange={(e) => setEmail(e.target.value)} />
                                        </div>
                                        <div className="md:col-span-5">
                                            <label htmlFor="tel">Phone No</label>
                                            <input type="tel" name="phoneNo" id="tel" required className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value={phoneNo} placeholder="Phone No." onChange={(e) => setPhoneNo(e.target.value)} />
                                        </div>



                                        <div className="md:col-span-2">
                                            <label htmlFor="country">Country / region</label>
                                            <select className="h-10 bg-gray-50 flex border w-full border-gray-200 rounded items-center mt-1"
                                                required
                                                value={country}
                                                onChange={(e) => setCountry(e.target.value)}
                                            >
                                                <option value="">Country</option>
                                                {Country &&
                                                    Country.getAllCountries().map((item) => (
                                                        <option key={item.isoCode} value={item.isoCode}>
                                                            {item.name}
                                                        </option>
                                                    ))}
                                            </select>
                                        </div>

                                        {country && (
                                            <div className="md:col-span-2">
                                                <label htmlFor="state">State / province</label>
                                                <select className="h-10 bg-gray-50 flex border w-full border-gray-200 rounded items-center mt-1"
                                                    required
                                                    value={state}
                                                    onChange={(e) => setState(e.target.value)}
                                                >
                                                    <option value="">State</option>
                                                    {State &&
                                                        State.getStatesOfCountry(country).map((item) => (
                                                            <option key={item.isoCode} value={item.isoCode}>
                                                                {item.name}
                                                            </option>
                                                        ))}
                                                </select>
                                            </div>
                                        )}
                                        {state && (
                                            <div className="md:col-span-1">
                                                <label htmlFor="state">City</label>
                                                <select className="h-10 bg-gray-50 flex border w-full border-gray-200 rounded items-center mt-1"
                                                    required
                                                    value={city}
                                                    onChange={(e) => setCity(e.target.value)}
                                                >
                                                    <option value="">City</option>
                                                    {City &&
                                                        City.getCitiesOfState(country, state).map((item) => (
                                                            <option key={item.isoCode} value={item.isoCode}>
                                                                {item.name}
                                                            </option>
                                                        ))}
                                                </select>
                                            </div>
                                        )}
                                        <div className="md:col-span-3">
                                            <label htmlFor="address">Address / Street</label>
                                            <input type="text" required name="address" id="address" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value={address} placeholder="Address" onChange={(e) => setAddress(e.target.value)}/>
                                        </div>
                                        <div className="md:col-span-2">
                                            <label htmlFor="zipcode">Zipcode</label>
                                            <input type="number" name="pinCode" required id="zipcode" className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="" value={pinCode} onChange={(e) => setPinCode(e.target.value)}/>

                                        </div>

                                        <div className="md:col-span-5 text-right">
                                            <div className="inline-flex items-end">
                                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Continue</button>
                                            </div>
                                        </div>

                                    </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </>
    )
}

export default Shipping