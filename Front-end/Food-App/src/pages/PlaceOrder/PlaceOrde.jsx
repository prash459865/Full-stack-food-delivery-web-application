import React, { useContext, useEffect, useState } from 'react'
import "./PlaceOrder.css"
import { StoreContext } from '../../Context/StoreContext'
import axios from "axios"
import { useNavigate } from 'react-router-dom'

const PlaceOrder = () => {

  const { getTotalCartAmount, food_list, cartItems,url,token,} = useContext(StoreContext)

  const [data,setdata] = useState({
      firstname:"",
      lastname:"",
      email:"",
      street:"",
      city:"",
      state:"",
      zipcode:"",
      country:"",
      phone:""
  })

  const onchangeHanle = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setdata(data =>({...data,[name]:value}))

  }

  const placeOrder = async(event) => {
      event.preventDefault();
      let OrderItems = [];
      food_list.map((item)=>{
          if(cartItems[item._id]>0)
          {
            let itemInfo = item;
            itemInfo["quantity"] = cartItems[item._id];
            OrderItems.push(itemInfo)
          }
      })

    
      let Orderdata = {
        address:data,
        items:OrderItems,
        amount:getTotalCartAmount()+2
      }
      let response = await axios.post(url+"/api/order/place",Orderdata,{headers:{token}})
      if(response.data.success)
      {
           const {session_url} = response.data;
           window.location.replace(session_url);
      }
      else{
        alert("error")
      }
    }
    
    //if log out not visible place order page
    const navigate = useNavigate();
    useEffect(()=>{
        if (!token) {
          navigate("/cart")
        }
        else if(getTotalCartAmount === 0)
          {
          navigate("/cart")
        }
    },[token])
  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className='placeorder-left'>
        <h2 className="title">Delivery Information</h2>
        <div className="multi-fields">
          <input required name='firstname' onChange={onchangeHanle} value={data.firstname} type="text" placeholder='First name' />
          <input required name='lastname' onChange={onchangeHanle} value={data.lastname} type="text" placeholder='Last name' />
        </div>
        <input required name='email' onChange={onchangeHanle} value={data.email} className='out-input' type="text" placeholder='Email Address' />
        <input required name='street' onChange={onchangeHanle} value={data.street} className='out-input' type="text" placeholder='Street' />

        <div className="multi-fields">
          <input required name='city' onChange={onchangeHanle} value={data.city} type="text" placeholder='City' />
          <input required name='state' onChange={onchangeHanle} value={data.state} type="text" placeholder='State' />
        </div>
        <div className="multi-fields">
          <input required name='zipcode' onChange={onchangeHanle} value={data.zipcode} type="text" placeholder='zipcode' />
          <input required name='country' onChange={onchangeHanle} value={data.country} type="text" placeholder='country' />
        </div>
        <input required name='phone' onChange={onchangeHanle} value={data.phone} className='out-input' type="text" placeholder='Phone' />
      </div>
      <div className='placeorder-right'>

        <div className="cart-proceed-topay">
          <div className="cart-total">
            <h2>Cart Total</h2>
            <div>
              <div className="cart-total-details">
                <p>Sub Total</p>
                <p>{getTotalCartAmount()}</p>
              </div>
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>{2}</p>
              </div>
              <div className="cart-total-details">
                <p>Total</p>
                <p>{getTotalCartAmount() + 2}</p>
              </div>
              <button type='submit'>Pay</button>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
