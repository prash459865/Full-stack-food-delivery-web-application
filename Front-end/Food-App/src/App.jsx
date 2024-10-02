import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import { Route, Routes } from 'react-router-dom'
import PlaceOrder from './pages/PlaceOrder/PlaceOrde'
import Login from './components/LoginPopup/Login'
import { useState } from 'react'
import Verify from './pages/Verify/Verify'
import Myorders from './pages/myorders/Myorders'


const App = () => {
  const[showlogin, setshowlogin] = useState(false)

  return (
   <> 
    {showlogin?<Login/>:<></>}
    <div className='App-container'>
      <Navbar setshowlogin = {setshowlogin}/>
      <Routes>
      <Route path='/' element={<Home />} />       
       <Route path = '/Cart' element= {<Cart/>}/>
       <Route path = '/PlaceOrder' element= {<PlaceOrder/>}/>
       <Route path = '/verify' element= {<Verify/>}/>
       <Route path = '/myorders' element= {<Myorders/>}/>

      </Routes>
    </div>
    </>
  )
}

export default App
