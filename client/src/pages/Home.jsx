import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../api/url'
import toast from 'react-hot-toast';
import ReactPaginate from 'react-paginate';
import InfiniteScroll from 'react-infinite-scroll-component'
import axins from '../api/url';
const Home = () => {
 
  let navigate=useNavigate();
  const [details,setdetails]=useState([]);
  const [searchterm,setsearchterm]=useState('');
  const [filtereddetails,setfiltereddetails]=useState([]);
  const [resfilter,setresfilter]=useState([]);
  const [page,setpage]=useState(1);
const contentperpage=5;
const total_page=Math.ceil(details.length/contentperpage)
let token=localStorage.getItem('jwttoken');
  const getdetails=async()=>{
    await axios.get('/inventory/pendingdetails',{headers:{
      Authorization:`Bearer ${token}`
    }}).then((res)=>{
      setdetails(res.data.details);
      
      setoutamount(details.reduce((acc,curr)=>{
        return acc+curr.amount
      },0))
      if(searchterm!=''){
        let filt=details.filter((items)=>items.name.toLowerCase().includes(searchterm) || items.branch.toLowerCase().includes(searchterm) || items.voucher.toString().includes(searchterm))
    setfiltereddetails(filt)
  return  setresfilter(filt)
    
        
      }
   else{
  const lastIndex=(page*contentperpage)
const firstIndex=Math.ceil((lastIndex-contentperpage))
let det=details.slice(firstIndex,lastIndex)
     setfiltereddetails(det);
     setresfilter(details);
   }
 
    }).catch((er)=>toast.error(er.response.data.errors,{position:"top-center"}))
  }
  const [outamount,setoutamount]=useState(0);
  const handlesearch=(e)=>{
    setsearchterm(e.target.value)
  }
 useEffect(()=>{
  getdetails();
 },[details,searchterm])
 const Handlefinish=async(voucher)=>{
  const data={status:"PAID"}
  await axios.put(`/inventory/paymentpaid/${voucher}`,data,{headers:{
    Authorization:`Bearer ${token}`
  }}).then((res)=>{
    toast.success(res.data.message,{position:'top-center'});
    getdetails();
  }).catch(er=>toast.error(er.response.data.errors,{position:'top-center'}))
//  await axios.delete(`/inventory/deletedata${voucher}`,{headers:{  Authorization:`Bearer ${token}`
//  }}).then((res)=>toast.success(res.data.message,{position:'top-center'})).catch(er=>toast.error(er.response.data.errors,{position:"top-center"}))
 }
//  const filterdata=()=>{
//   let filter=details
  
//   setfiltereddetails(filter);
//  }
//  useEffect(()=>{
  
//   filterdata();
//  },[details])

// let contentLength=details.length;
// let lastIndex=(contentLength/contentperpage)-1
// let firstIndex=(lastIndex-contentperpage)-1
const getpaginate=(pageno)=>{
  const lastIndex=(pageno*contentperpage)
const firstIndex=Math.ceil((lastIndex-contentperpage))

   let det=details.slice(firstIndex,lastIndex)
   setfiltereddetails(det);
}

  return (
    <>
    <div className='hidden lg:block'>
      <div className='w-[100%] border-2 mt-1 p-4 flex gap-2 justify-center'>
        <input type='text' placeholder='Enter Branch Or Voucher to search' className='w-[30%] p-3 border-2 border-solid border-blue-400 outline-none' value={searchterm} onChange={handlesearch}/>
        <span className='mt-4 text-indigo-700'>Pending_amount:<input type='number' value={outamount} readOnly className='border-2 outline-none text-center'/></span>
        <button className='bg-green-400 p-3 rounded-md shadow-lg text-white active:scale-[0.9]' onClick={()=>navigate('/closeaccounts')}>Closed Account</button>
      </div>
      {/* {details.length>0?details.map((detail,index)=>(<div key={index}>{detail.name}</div>)):<h1>No Data found</h1>} */}
      <div className='p-2 h-[400px] overflow-scroll'>
      <table className='w-full border-2 border-green-500 shadow-lg'>
        <thead className='border-2 border-green-500 hover:bg-gray-300 hover:text-white'>
          <tr className='border-2 border-green-500'>
            <th
            className='border-2 border-green-500'>Voucher_No</th>
            <th className='border-2 border-green-500'>Name</th>
            <th className='border-2 border-green-500'>Address</th>
            <th className='border-2 border-green-500'>Phone</th>
            <th className='border-2 border-green-500'>Branch</th>
            <th className='border-2 border-green-500'>Loaned_Date</th>
            <th className='border-2 border-green-500'>Amount</th>
            <th className='border-2 border-green-500'>Close</th>
          </tr>
        </thead>
        <tbody className='border-2 border-green-500 text-center'>
        
          {filtereddetails.length>0?filtereddetails.map((detail)=>(<tr key={detail.voucher} className='border-2 border-green-500  hover:bg-gray-300 hover:text-white'>
            <td className='border-2 border-green-500'>{detail.voucher}</td>
            <td className='border-2 border-green-500'>{detail.name}</td>
            <td className='border-2 border-green-500'>{detail.address}</td>
            <td className='border-2 border-green-500'>{detail.phone}</td>
            <td className='border-2 border-green-500'>{detail.branch}</td>
            <td className='border-2 border-green-500'>{detail.date}</td>
            <td className='border-2 border-green-500'>{detail.amount}</td>
            <td className='border-2 border-green-500 p-1'><button className='bg-green-500 p-2 rounded-md shadow-lg text-white active:scale-[0.9]' onClick={()=>Handlefinish(detail.voucher)}>Close/Pay</button></td>
          
          </tr>)):<tr className='border-2 border-green-500'><td colSpan={8} className='border-2 border-green-500'>Loading.....</td></tr>}

        </tbody>
      </table>
      </div>
      <div className='flex justify-center'>

      <span className='mr-6'>{page} of {total_page}</span>
      <button className='mr-6' onClick={()=>{
        setpage(1)
        getpaginate(1)}}>{'<<'}</button>
      <button onClick={()=>{
        setpage(total_page)
        getpaginate(total_page)}}>{'>>'}</button>
      <label className='ml-5'>Select page</label>
     <select value={page} onChange={(e)=>{
      setpage(e.target.value)
     getpaginate(e.target.value)
      }} className='ml-5'>
      {Array.from({length:total_page},(_,i)=>(<option key={i+1} value={i+1}>{i+1}</option>))}
     </select>
      </div>

      </div>
      <div className='block lg:hidden w-screen p-2'>
      <div className='w-[100%]  mt-1  p-4 flex gap-2 justify-center'>
        <input type='text' placeholder='Enter Branch Or Voucher to search' className='w-[60%] p-3 border-2 border-solid border-blue-400 outline-none ' value={searchterm} onChange={handlesearch}/>
        <button className='bg-green-400 p-3 rounded-md shadow-lg text-white active:scale-[0.9] mr-3' onClick={()=>navigate('/closeaccounts')}>Closed Account</button>
      </div>
      <span className='mt-4 ml-16 text-indigo-700'>Pending_amount:<input type='number' value={outamount} readOnly className='border-2 outline-none text-center'/></span>
      <div className='h-[800px]  overflow-y-auto'>
        {resfilter.length>0?resfilter.map((detail)=>(
           <div className='flex flex-col gap-4 p-6 shadow-lg ml-[3rem] text-2xl text-red-600' key={detail.voucher}>
           <span className='ml-[30%]'>Voucher:{detail.voucher}</span>
           <span className='ml-[30%]'>Name:{detail.name}</span>
           <span className='ml-[30%]'>Addres:{detail.address}</span>
           <span className='ml-[30%]'>Branch:{detail.branch}</span>
           <span className='ml-[30%]'>Phone:{detail.phone}</span>
           <span className='ml-[30%]'>Date:{detail.date}</span>
           <span className='ml-[30%]'>Amount:{detail.amount}</span>
           <span className='ml-[25%]'><button className=' bg-blue-400 w-[250px] p-4 text-white rounded-md shadow-lg' onClick={()=>Handlefinish(detail.voucher)}>Close/Pay</button></span>
         </div>
        )):<div className='flex flex-col gap-4 p-6 shadow-lg ml-[3rem] text-2xl'><h1>No Data Found</h1></div>}
     
      </div>
      </div>
    </>
  )
}

export default Home