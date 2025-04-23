import React, { useContext, useEffect, useState } from 'react'
// import axios from 'axios'
import axios from '../api/url'
import toast from 'react-hot-toast'
import { rolebased } from '../App'
import { useNavigate } from 'react-router-dom'
const Login = () => {
  const [auth,setauth,role,setrole]=useContext(rolebased)
  const fields=[{name:"username",type:"text"},{name:"password",type:"password"}]
  const [user,setuser]=useState({username:"",password:""})
  let navigate=useNavigate()
  const Handledata=(e)=>{
setuser({...user,[e.target.name]:e.target.value})
  }
  const Loginhandle=async()=>{
    try{
      if(user.username=='' || user.password==''){
        return toast.error("Please Enter username and password",{position:"top-right"})
        }
        await axios.post('/auth/login',user).then((res)=>{
      
          let roles=res.data.user.role;
          let tokens=res.data.amt;
          localStorage.setItem('jwttoken',tokens)
        setauth(true);
        setrole(roles);
        roles=='admin'?navigate('/home'):navigate('/not');
        setuser({username:'',password:''})
        }).catch((err)=>toast.error(err.res.data.errors,{position:"top-center"}))
       
    }
    catch(err){
      toast.error(err,{position:"top-right"})
    }


  }
  return (
    <>
    <div className='hidden lg:block'>
    <div className='w-full h-screen text-white flex items-center justify-center '>
      <div className='  w-[350px] text-indigo-600 h-[450px] rounded-md p-[15px] flex justify-center shadow-lg'>
        <div className=' p-7 flex flex-col gap-3'>
          <h1 className='italic text-green-500 text-center animate-bounce'>Login</h1>

<form className='flex flex-col gap-3'>
<label htmlFor='username'>username</label>
<input type='text' name='username' className='flex-1 border-b-4 border-black outline-none bg-white' value={user.username} onChange={Handledata}/>
<label htmlFor='password'>password</label>
<input type='password' name='password' className='flex-1 border-b-4 border-black outline-none bg-white' value={user.password} onChange={Handledata}/>
</form>
<div className='flex mt-5'>
  <button className='p-2 bg-indigo-600 text-white flex-1 active:scale-[0.9]' onClick={Loginhandle}>Login</button>
</div>
        </div>
      </div>
    </div>
    </div>
<div className='block lg:hidden text-3xl'>
<div className='w-screen h-screen text-white flex  justify-center items-center '>
      <div className='  w-[65%] text-indigo-600 h-[65%] rounded-md p-[15px] flex justify-center shadow-lg'>
        <div className=' p-7 flex flex-col gap-3'>
          <h1 className='italic text-green-500 text-center animate-bounce'>Login</h1>

<form className='flex flex-col gap-3 w-full'>
<label htmlFor='username'>username</label>
<input type='text' name='username' className='flex-1 border-b-4 border-black outline-none bg-white w-[250px] mb-10' value={user.username} onChange={Handledata}/>
<label htmlFor='password'>password</label>
<input type='password' name='password' className='flex-1 border-b-4 border-black outline-none bg-white w-[250px] mb-10' value={user.password} onChange={Handledata}/>
</form>
<div className='flex mt-5'>
  <button className='p-2 bg-indigo-600 text-white flex-1 active:scale-[0.9]' onClick={Loginhandle}>Login</button>
</div>
        </div>
      </div>
    </div>
</div>
    </>
  )
}

export default Login