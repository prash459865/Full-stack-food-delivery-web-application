import React from 'react'
import './navbar.css'
import {assets} from '../../assets/assets.js'

const Navbar = () => {
  return (
    <div className='Navbar'>
      <div className="Logo">
        <img src= {assets.logo}  alt="" />
      </div>
      <div className="profile">
        <img src={assets.profile_image} alt="" />
      </div>
    </div>
  )
}

export default Navbar
