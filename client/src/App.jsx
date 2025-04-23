import { createContext, useContext, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navigationbar from './components/Navigationbar'
import Login from './pages/Login'
import DashedBoard from './pages/DashedBoard'
import CreateAdmin from './pages/CreateAdmin'
import CreateUsers from './pages/CreateUsers'
import Home from './pages/Home'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import NotFound from './pages/NotFound'
import axios from 'axios';
import Inventory from './pages/Inventory'
import Updateinventory from './pages/Updateinventory'
import CloseAccounts from './pages/CloseAccounts'

export const rolebased=createContext()
function App() {
  
const [auth,setauth]=useState(false);
const [role,setrole]=useState('');
let navigate=useNavigate()
useEffect(()=>{
  const disablebackbutton=()=>{
    window.history.pushState(null,'',window.location.href)
    window.onpopstate=function(event){
      
      window.history.go(1)
    };
    
  };
  disablebackbutton();
  
  return()=>{
    window.onpopstate=null;
  };
},[]);
useEffect(()=>{
  const check1=async()=>{
    let jwttokens=localStorage.getItem('jwttoken');
    let locate=window.location.href.split('/').pop();
    try{
      if(jwttokens && locate=='login'){
  const tolen={'jwttokens':jwttokens}
const response=await axios.post('http://localhost:5045/api/auth/getrole2',tolen)

if(!response){
  return alert("Api can't to be send")
}
else{
  setrole(response.data.message.role);
  setauth(true);
  response.data.message.role=="admin"?navigate('/home'):navigate('/not')
}
      }
    }
    catch(er){
alert(er)
    }


  };
  check1();
},[])

  return (
    <>
      <div className='lg:flex lg:flex-col sm:flex '>
        <rolebased.Provider value={[auth,setauth,role,setrole]}>
        {auth==true &&<Navigationbar/>}
        <Routes>
          <Route path='/' element={<Navigate to={'/login'}/>}/>
         <Route path='/login' element={<Login/>}/>
         <Route path='/dashboard' element={auth==true?<DashedBoard/>:<NotFound/>}/> 
         <Route path='/home' element={auth==true?<Home/>:<NotFound/>}/>
         <Route path='/createadmin' element={role=='admin'?<CreateAdmin/>:<NotFound/>}/>
         {/**create  */}   
         <Route path='/createuser' element={role=='admin'?<CreateUsers/>:<NotFound/>}/> 
         <Route path='/inventory' element={role=='admin'?<Inventory/>:<NotFound/>}/>  
         <Route path='/updateinventory' element={role=='admin'? <Updateinventory/>:<NotFound/>}/>  
         <Route path='/closeaccounts' element={role=='admin'? <CloseAccounts/>:<NotFound/>}/>  
         <Route path='/not' element={<NotFound/>}/>
        </Routes>
       
</rolebased.Provider>
      </div>
      
    </>
  )
}

export default App
