import React, { useState } from 'react'
// import axios from 'axios'
import axios from '../api/url'
import toast from 'react-hot-toast'
const CreateAdmin = () => {
  const [admin,setadmin]=useState({username:'',fullname:'',password:'',role:'admin',jwttokens:''})
  let tokens=localStorage.getItem('jwttoken');
  admin.jwttokens=tokens;
  const Createadmin=async()=>{
    try{
      await axios.post('/auth/admin',admin).then((res)=>toast.success(res.data.message,{position:"top-center"}))
      setadmin({username:'',fullname:'',password:''});
    }
    catch(er){
      toast.error(er.response.data.errors,{position:"top-center"})
    }
    
  }
  const Admindetails=(e)=>{
setadmin({...admin,[e.target.name]:e.target.value})
  }
  return (
    <div>
       <div className='sm:hidden md:hidden lg:flex lg:justify-center lg:items-center p-4'>
      <div className='flex flex-col lg:w-[35%] md:w-full  h-[25rem] rounded-md shadow-xl gap-4'>
      <h1 className='text-center text-white bg-black p-2 '>CreateAdmin</h1>
      <div className='flex flex-col gap-4 p-7  border-2 border-black'>
        <div className='flex flex-col gap-2'>
          <label htmlFor='username '>UserName</label>
          <input type='text' name='username' className='outline-none border-b-[1px] border-black flex-1' value={admin.username} onChange={Admindetails}/>
        </div>
        <div className='flex flex-col gap-2'>
          <label htmlFor='fullname'>FullName</label>
          <input type='text' name='fullname' className='outline-none border-b-[1px] border-black flex-1' value={admin.fullname} onChange={Admindetails}/>
        </div>
        <div className='flex flex-col gap-2'>
          <label htmlFor='password'>Password</label>
          <input type='password' name='password' className='outline-none border-b-[1px] border-black flex-1' value={admin.password} onChange={Admindetails}/>
        </div>
        <div className='flex'>
          <button className='flex-1 bg-indigo-500 scale-[0.9] rounded-lg shadow-xl p-5 text-white hover:bg-indigo-300' onClick={Createadmin}>CreateAdmin</button>
        </div>
      </div>
      </div>
       </div>
       <div className='sm:flex md:flex lg:hidden  lg:items-center p-4 w-screen h-screen'>
      <div className='flex flex-col  w-[80%]  h-[80%] rounded-md shadow-xl gap-4 '>
      <h1 className='text-center text-white bg-black p-2 '>CreateAdmin</h1>
      <div className='flex flex-col gap-4 p-7  border-2 border-black '>
        <div className='flex flex-col gap-2'>
          <label htmlFor='username '>UserName</label>
          <input type='text' name='username' className='outline-none border-b-[1px] border-black flex-1' value={admin.username} onChange={Admindetails}/>
        </div>
        <div className='flex flex-col gap-2'>
          <label htmlFor='fullname'>FullName</label>
          <input type='text' name='fullname' className='outline-none border-b-[1px] border-black flex-1' value={admin.fullname} onChange={Admindetails}/>
        </div>
        <div className='flex flex-col gap-2'>
          <label htmlFor='password'>Password</label>
          <input type='password' name='password' className='outline-none border-b-[1px] border-black flex-1' value={admin.password} onChange={Admindetails}/>
        </div>
        <div className='flex'>
          <button className='flex-1 bg-indigo-500 scale-[0.9] rounded-lg shadow-xl p-5 text-white hover:bg-indigo-300' onClick={Createadmin}>CreateAdmin</button>
        </div>
      </div>
      </div>
       </div>
    </div>
   
  )
}

export default CreateAdmin