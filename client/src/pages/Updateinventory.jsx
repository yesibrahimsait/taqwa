import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from '../api/url';
import toast from 'react-hot-toast';

const Updateinventory = () => {
  let token=localStorage.getItem('jwttoken');
const [data,setdata]=useState({name:'',branch:'',address:'',amount:'',date:'',phone:''})
const [voucher,setvoucher]=useState('');
  let navigate=useNavigate();
  const Handlesubmit=async()=>{
   
await axios.get(`/inventory/getinventory/${voucher}`,{headers:{
  Authorization:`Bearer ${token}`
}}).then((res)=>{
setdata({name:res.data.name,branch:res.data.branch,address:res.data.address,amount:res.data.amount,
date:res.data.date,phone:res.data.phone})
}).catch((er)=>toast.error(er.response.data.errors,{position:"top-center"}))

   
  }
  const Handleupdate=(e)=>{
   
    setdata({...data,[e.target.name]:e.target.value})
  }
  const Handlevoucher=(e)=>{
    setvoucher(e.target.value);
  }
  const updateinventories=async()=>{
    try{
if(data.address=='' || data.amount=='' || data.branch=='' || data.date=='' || data.name=='' || data.phone==''){
  data.year=data.date.split('-')[0];
return toast.error("Data not found for update",{position:'top-center'})
}
await axios.put(`/inventory/dataupdate/${voucher}`,data,{headers:{
  Authorization:`Bearer ${token}`
}}).then((res)=>{
  toast.success(res.data.message,{position:'top-right'});
setdata({name:'',branch:'',address:'',amount:'',date:'',phone:''})
setvoucher('');
}).catch((er)=>toast.error(er.response.data.errors,{position:'top-center'}))
    }
    catch(er){
      toast.error(er,{position:"top-centre"})
    }
  }
  const deleteinventories=async()=>{
    await axios.delete(`/inventory/deletedata/${voucher}`,{headers:{
      Authorization:`Bearer ${token}`
    }}).then((res)=>{
      toast.success(res.data.message,{position:'top-right'});
      setdata({name:'',branch:'',address:'',amount:'',date:'',phone:''})
setvoucher('');
    }).catch(er=>toast.error(er.response.data.errors,{position:'top-center'}))
  }
  return (
    <div className='mt-3'>
        <div className='hidden lg:block'>
      <div className='flex justify-center gap-4'>
    <div className='w-[450px]'>
    <input type='number' className='w-full mt-1 py-3 outline-none border-2' placeholder='Enter Vocher No to search' name='voucher' value={voucher} onChange={Handlevoucher}/>
    </div>
        
        
    
        <button className='px-5 bg-indigo-400 rounded-md  text-white shadow-lg' onClick={Handlesubmit}>Submit</button>
    
        <button className='bg-green-400 px-5 rounded-md shadow-lg text-white' onClick={()=>navigate('/inventory')}>Back</button>
         </div>  
         <div className='flex  lg:justify-center mt-3'>
          <div className='w-[30%] p-10 flex flex-col gap-3 rounded-md shadow-lg'>
<div className='flex flex-col w-[100%] p-1 text-red-500'>
    <label>Name:</label>
    <input type='text' className='py-1 rounded-lg border-2 border-indigo-300' name='name' value={data.name} onChange={Handleupdate}/>


    <label>Branch:</label>
    <input type='text' className='py-1 rounded-lg border-2 border-indigo-300 outline-none' name='branch' value={data.branch} onChange={Handleupdate}/>


    <label>Address:</label>
 <textarea className='py-1 rounded-lg border-2 border-indigo-300' name='address' value={data.address} onChange={Handleupdate}></textarea>

    <label>Phone:</label>
    <input type='text' className='py-1 rounded-lg border-2 border-indigo-300' name='phone' value={data.phone} onChange={Handleupdate}/>
<label>Date:</label>
    <input type='date' className='py-1 rounded-lg border-2 border-indigo-300' name='date' value={data.date} onChange={Handleupdate}/>


    <label>Amount:</label>
    <input type='number' className='py-1 rounded-lg border-2 border-indigo-300' name='amount' value={data.amount} onChange={Handleupdate}/>
    </div>
<div className='flex gap-3 ml-4'>
<button className='bg-green-300 p-3 rounded-md shadow-lg' onClick={updateinventories}>Update</button>
<button className='bg-red-600 p-3 rounded-md shadow-lg' onClick={deleteinventories}>Delete</button>
</div>
</div>
         </div>
         </div>
         <div className='block lg:hidden w-screen h-screen '>
          <div className='p-4 flex gap-10 '><input type='number' className='w-[40%] p-3 border-2 border-black' placeholder='Enter voucher No to update' value={voucher} onChange={Handlevoucher}/>
          
          <button className='bg-indigo-500 text-white p-3 rounded-md'  onClick={Handlesubmit}>Submit</button>
          <button className='bg-green-500 text-white p-3 rounded-md' onClick={()=>navigate('/inventory')}>Back</button>
        
          </div>
          <div className='flex w-[100%] h-[100%] '>
            <div className='ml-[5%] w-[50%]'>
              <div className='flex flex-col gap-2'>
              <lable className='text-2xl'>Name:</lable>
              <input type='text' className='flex-1 border-2 border-black p-4'name='name' value={data.name} onChange={Handleupdate}/>
              </div>
           <div className='flex flex-col gap-2'><lable className='text-2xl'>Branch:</lable>
           <input type='text' className='flex-1 border-2 border-black p-4' name='branch' value={data.branch} onChange={Handleupdate}/></div>
            <div className='flex flex-col gap-2'>
            <lable className='text-2xl'>Address:</lable>
            <input type='text' className='flex-1 border-2 border-black p-4'  name='address' value={data.address} onChange={Handleupdate}/>
            </div>
            <div className='flex flex-col gap-2'>
            <lable className='text-2xl'>Phone:</lable>
            <input type='text' className='flex-1 border-2 border-black p-4'  name='phone' value={data.phone} onChange={Handleupdate}/>
            </div>
            <div className='flex flex-col gap-2'>
            <lable className='text-2xl'>Date:</lable>
            <input type='date' className='flex-1 border-2 border-black p-4'  name='date' value={data.date} onChange={Handleupdate}/>
            </div>
           <div className='flex flex-col'>
           <lable className='text-2xl'>Amount:</lable>
           <input type='number' className='flex-1 border-2 border-black p-4'  name='amount' value={data.amount} onChange={Handleupdate}/>
           </div>
           <div className='mt-5 flex gap-2'>
           <button className="p-4 bg-indigo-500 text-white text-2xl rounded-md" onClick={updateinventories}>Update</button>
           <button className="p-4 bg-red-600 text-white text-2xl rounded-md" onClick={deleteinventories}>Delete</button>
           </div>
            
            </div>
           
          </div>
         </div>
    </div>
  )
}

export default Updateinventory