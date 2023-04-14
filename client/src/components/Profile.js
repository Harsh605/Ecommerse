import React from 'react'
import EmailIcon from '@mui/icons-material/Email';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';
const handleEmailChange = () => {

}



const Account = ({ userData }) => {
  const style = {
    width: '100%',
    maxWidth: 360,
    bgcolor: 'background.paper',
  };
  return (
    
    <>
      <div className="bg-white md:mx-auto rounded w-full  overflow-hidden mb-10">
        <div className="h-[200px] bg-gradient-to-r from-blue-200 to-purple-500"></div>
        <div className="px-10 py-2 flex flex-col gap-3 pb-6 ">
          <div className="h-[90px] shadow-md w-[90px] rounded-full border-4 overflow-hidden -mt-14 border-white">
            <img src={userData.avatar.url} className="w-full h-full rounded-full object-center object-cover" />
          </div>
          <div className="">
            <h3 className="text-xl text-slate-900 relative font-bold leading-6">{userData.name}</h3>
            <p className="text-sm text-gray-600">@daddasoft</p>
          </div>
          <div className="flex gap-3 flex-wrap"><span className="rounded-sm bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-800">{userData.role}</span></div>

          <div className="w-2/3 m-auto">
            <div className='flex justify-between'>
              <h1 className='text-3xl mb-5 font-medium'>My Profile</h1>
              <div>
                <Link to="/me/update" className='rounded-lg p-2 bg-sky-700 text-l mb-5 text-slate-200 font-medium hover:bg-sky-600'><EditIcon style={{ marginRight: "5px", fontSize: "1rem" }} />Edit Profile</Link>
              </div>
            </div>

            <div className='border'>
            <div className='flex justify-between mx-5 my-4'>
                <span className='font-medium'>Name</span>
                <span>{userData.name}</span>
              </div>
              <Divider />
              <div className='flex justify-between mx-5 my-4'>
                <span className='font-medium'>Email</span>
                <span>{userData.email}</span>
              </div>
              <Divider />
              <div className='flex justify-between mx-5 my-4'>
                <span className='font-medium'>Password</span>
                <Link to="/password/update" className='  text-l font-medium hover:text-red-950'><EditIcon className='hover:text-sky-600' style={{ marginRight: "5px" }} /></Link>

              </div>
              <Divider />
              <div className='flex justify-between mx-5 my-4'>
                <span className='font-medium'>Mobile No.</span>
                {userData.mobile ? <span>{userData.mobile}</span> : null}
              </div>
              <Divider />
              <div className='flex justify-between mx-5 my-4'>
                <span className='font-medium'>Joined On</span>
                <span>{String(userData.createdAt).substr(0,10)}</span> 
              </div>
              <Divider />
            </div>
            <div className='flex justify-center gap-3 my-5'>
            <Link to="/password/update" className='rounded-lg p-2 bg-sky-700 text-l mb-5 text-slate-200 font-medium hover:bg-sky-500'>Change Password</Link>
            <Link to="/orders" className='rounded-lg p-2 bg-sky-700 text-l mb-5 text-slate-200 font-medium hover:bg-sky-500'>My Orders</Link>

            </div>
          </div>
        </div>
      </div>
      <Divider />
    </>
  )
}

export default Account