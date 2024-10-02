import React, { useContext, useEffect, useState } from 'react'
import "./myorders.css"
import { StoreContext } from '../../Context/StoreContext'
import axios from "axios"
import { assets } from '../../assets/assets'

const Myorders = () => {
const {url,token} = useContext(StoreContext) 
const [data,setdata] = useState([])

const fetchOrder = async() =>{
    const response = await axios.post(url+"/api/order/userorders",{},{headers:{token}})
    setdata(response.data.data)
    console.log(response.data.data);
    
}
useEffect(()=>{
  if(token)
  {
     fetchOrder();
  }

},[token])

  return (
    <div className='Myorders'>
        <h2>My Orders</h2>
        <div className="container">
            {
                data.map((order, index)=>{
                     return(
                        <div key={index} className="my-orders-order">
                             <img src={assets.parcel_icon} alt="" />
                             <p className='order-names' >{order.items.map((item,index)=>{
                                  if (index === order.items.length-1) {
                                    return item.name+" *"+item.quantity
                                  }
                                  else{
                                    return item.name+" *"+item.quantity+", "

                                  }
                             })}</p>
                             <p>${order.amount}.00</p>
                             <p>Items:{order.items.length}</p>
                             <p>* <b>{order.status}</b></p>
                             <button onClick={fetchOrder}>Track order</button>
                        </div>
                     )
                })
            }
        </div>
    
    </div>
  )
}

export default Myorders
