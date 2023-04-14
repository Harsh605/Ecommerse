import React from 'react'
import { updateProfile } from '../../slices/userSlice'
import { useDispatch,useSelector } from 'react-redux'
import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Backlog from '../Loading/Backlog'




const UpdateProfile = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const {userData,isUpdated,isLoading} = useSelector((state) => state.custom2)

    const [avatar, setAvatar] = useState(userData.avatar.url)
    const [avatarPreview, setAvatarPreview] = useState(userData.avatar.url)

    const [user, setUser] = useState({
        name: userData.name,
        email: userData.email,
    })
    const { name, email } = user

    const handleChange = (e) => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(updateProfile({ name, email, avatar }));
    }

    const handleImgUpload = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState == 2) {
                setAvatar(reader.result)
                setAvatarPreview(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0])
    }

    useEffect(() => {
        if (isUpdated) {
            navigate("/account")
        }

    }, [navigate, isUpdated])

  return (
    (isLoading)? (<Backlog/>):
    
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
                        <h3 className="my-4 text-2xl font-semibold text-gray-700">Update Profile</h3>
                        <form action="#" className="flex flex-col space-y-5" encType="multipart/form-data" onSubmit={handleSubmit}>
                            <div className="flex flex-col space-y-1">
                                <label htmlFor="email" className="text-sm font-semibold text-gray-500">Full Name</label>
                                <input
                                    type="text"
                                    placeholder="Name"
                                    name="name"
                                    value={user.name}
                                    autoFocus
                                    className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="flex flex-col space-y-1">
                                <label htmlFor="email" className="text-sm font-semibold text-gray-500">Email address</label>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    id="email"
                                    name="email"
                                    value={user.email}
                                    autoFocus
                                    className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="flex flex-col space-y-1">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-semibold text-gray-500" >Upload Your Photo</span>
                                </div>
                                <div className='flex'>
                                    <label for="dropzone-file" className="w-full   border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6 ">
                                            <div className='flex w-full items-center justify-center gap-4'>
                                                <div className='w-1/2 flex justify-center item-center'>
                                                    <img src={avatar} style={{ width: "100%", maxWidth: "150px" }} alt="Avatar Preview" />
                                                </div>
                                                <div className='w-1/2'>
                                                    <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokelinecap="round" strokeLinejoin="round" strokeWidth
                                                        ="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                                </div>
                                            </div>

                                        </div>

                                        <input
                                            type="file"
                                            name="file"
                                            id="dropzone-file"
                                            onChange={handleImgUpload}
                                            accept="image/*"
                                            className=" hidden px-4 py-2 transition duration-300  focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                                        />

                                    </label>

                                </div>
                            </div>


                            <div>
                                <button
                                    type="submit"
                                    className="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4"
                                >
                                    Update
                                </button>
                            </div>
                           
                        </form>
                    </div>
                </div>
            </div>
  )
}

export default UpdateProfile