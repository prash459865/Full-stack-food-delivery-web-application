import React, { useState } from 'react';
import { assets } from '../../assets/assets.js';
import './sidebar.css';
import {Link} from "react-router-dom";

const Sidebar = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleEvent = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className='sidebar'>
      <div className="options">
        <div onClick={() => handleEvent(0)} className={`image ${activeIndex === 0 ? 'active' : ''}`}>
          <Link to= "/add"><img src={assets.add_icon} alt="Add Items" /></Link>
          <p>Add Items</p>
        </div>
        <div onClick={() => handleEvent(1)} className={`image ${activeIndex === 1 ? 'active' : ''}`}>
          <Link to="/List"><img src={assets.order_icon} alt="List Items" /></Link>
          <p>List Items</p>
        </div>
        <div onClick={() => handleEvent(2)} className={`image ${activeIndex === 2 ? 'active' : ''}`}>
         <Link to="/Orders"> <img src={assets.order_icon} alt="Orders" /></Link>
          <p>Orders</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
