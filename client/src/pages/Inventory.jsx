import React, { useState } from 'react'
import toast from 'react-hot-toast';
import axios from '../api/url';
import { useNavigate } from 'react-router-dom';
const Inventory = () => {
  let navigate= useNavigate();
  let branch=['Ramnad','Mandapam'];
  let token=localStorage.getItem('jwttoken')
  const [data,setdata]=useState([{voucher:'',name:'',address:'',phone:'',date:'',amount:'',branch:''},
    {voucher:'',name:'',address:'',phone:'',date:'',amount:'',branch:''}
    ,{voucher:'',name:'',address:'',phone:'',date:'',amount:'',branch:''},
    {voucher:'',name:'',address:'',phone:'',date:'',amount:'',branch:''},{
      voucher:'',name:'',address:'',phone:'',date:'',amount:'',branch:''}
  ]);
  const [resdata,setresdata]=useState({voucher:'',name:'',address:'',phone:'',date:'',amount:'',branch:''});
const [loading, setloading]=useState(false);
const reshandlesubmit=(e)=>{
  setresdata({...resdata,[e.target.name]:e.target.value});
}
  // const Handledata=(i,field)=>(e)=>{
    
  //   const newdata=data.map((data,index)=>i==index?{...data,[field]:e.target.value}:data)
  //   setdata(newdata)
  // }
  const Handledata=(i)=>(e)=>{
    
    const newdata=data.map((data,index)=>i==index?{...data,[e.target.name]:e.target.value}:data)
    setdata(newdata)
  }
  const AddData=async()=>{
let newdata=[]
  

  data.forEach((data)=>{
    if(data.address!="" && data.name!="" && data.amount!="" && data.branch!="" && data.date!='' && data.phone!="" && data.voucher!=""){
    data.status="TOPAY";
      data.address=data.address.toUpperCase();
      data.name=data.name.toUpperCase();
      data.branch=data.branch.toUpperCase();
      data.year=data.date.split('-')[0];
newdata.push(data);
     
     

    }
    
  })

if(newdata.length<1){
  return toast.error("No data to addInventory",{position:'top-center'})
}
setloading(true);
await axios.post('/inventory/addinventory',newdata,{
  headers:{
    Authorization:`Bearer ${token}`
  }
}).then((res)=>{
  toast.success(res.data.message,{position:'top-right'});
  setdata([{voucher:'',name:'',address:'',phone:'',date:'',amount:'',branch:''},
    {voucher:'',name:'',address:'',phone:'',date:'',amount:'',branch:''}
    ,{voucher:'',name:'',address:'',phone:'',date:'',amount:'',branch:''},
    {voucher:'',name:'',address:'',phone:'',date:'',amount:'',branch:''},{
      voucher:'',name:'',address:'',phone:'',date:'',amount:'',branch:''}
  ])
}).catch((er)=>toast.error(er.response.data.errors,{position:'top-center'})).finally(()=>setloading(false))


  }
  const updatedata=()=>{
    
navigate('/updateinventory');
  }

 const resaddinventory=async()=>{
  
    if(resdata.address!='' && resdata.amount!='' && resdata.branch!='' && resdata.date!='' && resdata.name!='' && resdata.phone!='' && resdata.voucher!=''){
      resdata.status="topay";
      resdata.year=resdata.date.split('-')[0];
      resdata.address=resdata.address.toUpperCase();
      resdata.branch=resdata.branch.toUpperCase();
      resdata.name=resdata.name.toUpperCase();
      alert(resdata.year)
      await axios.post('/inventory/addinventory',resdata,{headers:{
        Authorization:`Bearer ${token}`
      }}).then((res)=>{
        toast.success(res.data.message,{position:'top-center'});
      setresdata({voucher:'',name:'',address:'',phone:'',date:'',amount:'',branch:''});
      }).catch((er)=>toast.error(er.response.data.errors,{position:"top-center"}))
    }
    else{
     return toast.error("All field are required",{position:"top-center"})
     }
  
  
  
 }
 const clearinventory=()=>{
  setdata([{voucher:'',name:'',address:'',phone:'',date:'',amount:'',branch:''},
    {voucher:'',name:'',address:'',phone:'',date:'',amount:'',branch:''}
    ,{voucher:'',name:'',address:'',phone:'',date:'',amount:'',branch:''},
    {voucher:'',name:'',address:'',phone:'',date:'',amount:'',branch:''},{
      voucher:'',name:'',address:'',phone:'',date:'',amount:'',branch:''}
  ]);
  setresdata({voucher:'',name:'',address:'',phone:'',date:'',amount:'',branch:''});
 }
  return (
    <div>
    <div className='hidden lg:block w-full p-5 border-2'>
      <div className='flex sm:flex-col  lg:justify-between lg:flex-row  sm:gap-2 text-white '>
       
       
        <button className='bg-orange-400 px-3 py-2 rounded-md shadow-lg active:scale-[0.9]' onClick={AddData}>AddInventory</button>
       
       <button className='bg-green-400 px-3 py-2 rounded-md shadow-lg active:scale-[0.9]' onClick={updatedata}>UpdateInventory</button>
      <button className='bg-red-600 px-3 py-2 rounded-md shadow-lg active:scale-[0.9]' onClick={clearinventory}>Clear</button>
    </div>
    <div className='mt-3 w-full border-2 relative'>
      <table className='w-full'>
        <thead>
          <tr className='text-left border-2 border-collapse'>
          <th className='border-2 border-collapse'>Vocher.No</th>
          <th className='border-2 border-collapse'>Branch</th>
            <th className='border-2 border-collapse'>Name</th>
            <th className='border-2 border-collapse'>Address</th>
            <th className='border-2 border-collapse'>Phone</th>
            <th className='border-2 border-collapse'>Loaned_date</th>
            <th className='border-2 border-collapse'>Amount</th>
          </tr>
        </thead>
        <tbody>
 
 {/* {data.map((data,index)=>(<tr key={index} className='border-2 border-collapse'>
            <td className='border-2 border-collapse'><input type='number' className='h-[50px] w-full border-2 border-black text-center' onChange={Handledata(index,'voucher')} name='voucher' value={data.voucher}/></td>
            <td className='border-2 border-collapse'><input type='text' className='h-[50px] w-full border-2 border-black text-center'  onChange={Handledata(index,'branch')} name='branch' value={data.branch}/></td>
        <td className='border-2 border-collapse'><input type='text' className='h-[50px] w-full border-2 border-black text-center'  onChange={Handledata(index,'name')} name='name' value={data.name}/></td>
        <td className='border-2 border-collapse'><textarea className='h-[51px] w-full border-2 border-black text-center'  onChange={Handledata(index,'address')} name='address' value={data.address}></textarea></td>
        <td className='border-2 border-collapse'><input type='number' className='h-[50px] w-full border-2 border-black text-center' onChange={Handledata(index,'phone')} name='phone' value={data.phone}/></td>
        <td className='border-2 border-collapse'><input type='date' className='h-[50px] w-full border-2 border-black text-center'  onChange={Handledata(index,'date')} name='date' value={data.date}/></td>
        <td className='border-2 border-collapse'> <input type='number' className='h-[50px] w-full border-2 border-black text-center' onChange={Handledata(index,'amount')} name='amount' value={data.amount}/></td>
 </tr>))} */}
 {data.map((data,index)=>(<tr key={index} className='border-2 border-collapse'>
            <td className='border-2 border-collapse'><input type='number' className='h-[50px] w-full border-2 border-black text-center' onChange={Handledata(index)} name='voucher' value={data.voucher}/></td>
            <td className='border-2 border-collapse'><input type='text' className='h-[50px] w-full border-2 border-black text-center'  onChange={Handledata(index)} name='branch' value={data.branch}/></td>
        <td className='border-2 border-collapse'><input type='text' className='h-[50px] w-full border-2 border-black text-center'  onChange={Handledata(index)} name='name' value={data.name}/></td>
        <td className='border-2 border-collapse'><textarea className='h-[51px] w-full border-2 border-black text-center'  onChange={Handledata(index)} name='address' value={data.address}></textarea></td>
        <td className='border-2 border-collapse'><input type='number' className='h-[50px] w-full border-2 border-black text-center' onChange={Handledata(index)} name='phone' value={data.phone}/></td>
        <td className='border-2 border-collapse'><input type='date' className='h-[50px] w-full border-2 border-black text-center'  onChange={Handledata(index)} name='date' value={data.date}/></td>
        <td className='border-2 border-collapse'> <input type='number' className='h-[50px] w-full border-2 border-black text-center' onChange={Handledata(index)} name='amount' value={data.amount}/></td>
 </tr>))}
        </tbody>
      </table>
     {loading=='true' && <span className='bg-white shadow-lg text-indigo-800 px-3 absolute left-[550px] top-[15px]'>Loading.......</span>} 
    </div>
    
    </div>
    <div className=' h-screen w-screen flex  lg:hidden  mt-1 '>
      <div className='flex flex-col w-[55%] p-5  ml-[2%] text-2xl'>
        <h1 className='mb-3 text-center bg-orange-300 text-white p-2'>Inventory</h1>
        
        <label className='mb-3'>Voucher.no</label>
        <input type='number' className='mb-3  border-b-2 border-black outline-none p-2' value={resdata.voucher} name='voucher' onChange={reshandlesubmit}/>
      
      
        <label className='mb-3'>Branch:</label>
        <input type='text' className='mb-3 border-b-2 border-black outline-none p-2' value={resdata.branch} name='branch' onChange={reshandlesubmit}/>
        
        
        <label className='mb-3'>Name:</label>
        <input type='text' className='mb-3 border-b-2 border-black outline-none p-2' value={resdata.name} name='name' onChange={reshandlesubmit}/>
        
      
        <label className='mb-3'>Address:</label>
        <input type='text' className='mb-3 border-b-2 border-black outline-none p-2' value={resdata.address} name='address' onChange={reshandlesubmit}/>
        
      
        <label className='mb-3'>Phone:</label>
        <input type='text' className='mb-3  border-b-2 border-black p-2' value={resdata.phone} name='phone' onChange={reshandlesubmit}/>
        
        
        <label className='mb-3'>Date:</label>
        <input type='date' className='mb-3 border-b-2 border-black p-2' value={resdata.date} name='date' onChange={reshandlesubmit}/>
        
      
        <label className='mb-3'>Amount:</label>
        <input type='number' className='mb-3 border-b-2 border-black p-2' value={resdata.amount} name='amount' onChange={reshandlesubmit}/>
        
        <div className='flex gap-3 mt-3 p-5 text-white '>
          <button className='px-3 py-1 bg-green-400 rounded-md active:scale-[0.9]' onClick={resaddinventory}>Add</button>
          <button className='px-3 py-1 bg-indigo-500 rounded-md active:scale-[0.9]' onClick={updatedata}>update</button>
          <button className='px-3 py-1 bg-red-500 rounded-md active:scale-[0.9]' onClick={clearinventory}>Clear</button>
        </div>
        </div>
      </div>
    </div>
  
  )
}

export default Inventory