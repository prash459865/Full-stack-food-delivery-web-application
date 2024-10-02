import React from 'react'
import "./Navbar.css"
import {assets} from '../../assets/assets';
import { Link } from 'react-router-dom';


const Navbar = ({setshowlogin}) => {
  return (
    <div className='Navbar'>
     <Link to={'/'}> <img src={assets.logo} className='Logo'/></Link>
      <ul className='Navbar-menu'>
        <li>Home</li>
        <li>Menu</li>
        <li>Contact US</li>
      </ul>

      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-searcg-icon">
           <Link to = '/cart'><img src= {assets.basket_icon} alt="" /></Link>
            <div className="dot"></div>
        </div>
        <div className="my-Orders">
         <Link to="/myorders"><img src={assets.parcel_icon} alt="" /></Link>
          <p>My Orders</p>
        </div>
        <button onClick={()=>setshowlogin(true)} className=''>Sign In</button>
      </div>
    </div>
  )
}

export default Navbar
