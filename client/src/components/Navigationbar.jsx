import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { RxDashboard } from "react-icons/rx";
import { MdHomeWork } from "react-icons/md";
import { GrUserAdmin } from "react-icons/gr";
import { FaUserFriends } from "react-icons/fa";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { IoIosCreate } from "react-icons/io";
import { rolebased } from '../App';
const Navigationbar = () => {
  const [auth,setauth,role,setrole]=useContext(rolebased);
  let navigate=useNavigate()
   const LogoutHandle=()=>{
    
    localStorage.removeItem('jwttoken');
    navigate('/login')
    setauth(false);
    setrole('');

   }
   
  return (
    <div className=''>
        <div className='sm:hidden md:hidden lg:flex lg:w-full  bg-indigo-400 justify-between items-center p-6'>
        {/* <span className='italic text-white bg-green-300 p-1 rounded-md hover:bg-yellow-200'>Taqwa-BaidulMaal</span> */}
        <div className="relative group">
            <button className="px-4 py-2 text-white 
                           bg-green-500 rounded 
                           hover:bg-green-600" onClick={LogoutHandle}>
                Taqwa-Baidulmaal
            </button>
            <div
                className="absolute top-1/2 left-full transform
                       -translate-y-1/2 translate-x-2 w-max 
                       px-2 py-1 text-sm text-white bg-gray-700
                       rounded shadow-lg opacity-0 
                       group-hover:opacity-100">
                Logout
            </div>
        </div>
        <ul className='flex gap-3'>
        {/* {role=="admin" &&  <Link to={'/dashboard'}><li className='text-white'>DashBoard</li></Link> } */}
            <Link to={'/home'}><li className='text-white'>Home</li></Link> 
            {role=="admin" && <Link to={'/inventory'}><li className='text-white'>CreateInventory</li></Link> }
            {role=="admin" &&<Link to={'/createadmin'}><li className='text-white'>CreateAdmin</li></Link> }
          
           
        </ul>
        </div>
       <div className='lg:hidden md:flex sm:flex flex-col gap-2 sm:w-[120px] h-screen bg-indigo-400 p-5 top-0 left-0'>
       <span className='italic text-white bg-green-300 p-3 rounded-md hover:bg-yellow-200 text-center text-[35px]' onClick={LogoutHandle}><RiLogoutCircleRLine /></span>
       <ul className='flex flex-col justify-center p-3 gap-4 text-[50px]'>
       {/* <Link to={'/dashboard'}><li className='text-white '><RxDashboard /></li></Link> */}
            <Link to={'/home'}><li className='text-white'><MdHomeWork /></li></Link> 
            <Link to={'/inventory'}><li className='text-white'><IoIosCreate /></li></Link> 
            <Link to={'/createadmin'}><li className='text-white'><GrUserAdmin /></li></Link> 
            <Link to={'/createuser'}><li className='text-white'><FaUserFriends /></li></Link> 
       </ul>
       </div>
    </div>
  )
}

export default Navigationbar