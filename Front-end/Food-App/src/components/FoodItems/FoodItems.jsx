import React, { useContext, useEffect, useState } from 'react'
import './FoodItems.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../Context/StoreContext'

const FoodItems = ({ id, name, price, description, image }) => {


    const {cartItems,addToCart,removeFromCart,url} = useContext(StoreContext)

    return (
        <div className='FoodItems-card'>
            <div className="food-image">
                <img className='main-image' src={`${url}/images/${image}`} alt="" />
                {
                    !cartItems[id]
                    ?<div className='Add'><img  src={assets.add_icon_white} onClick={()=>addToCart(id)}/></div>
                    :<div className='number-of-items'>
                        <img onClick={()=>removeFromCart(id)} src={assets.remove_icon_red}/>
                        {cartItems[id]}
                        <img onClick={()=>addToCart(id)} src={assets.add_icon_green}/>
                    </div>
                } 
            </div>
            <div className="info">
                <div className="name-and-rating">
                    <p>{name}</p>
                    <img className='rating-img' src={assets.rating_starts} alt="" />
                </div>
                <p className='descrption'>{description}</p>
                <p className='price'>${price}</p>
            </div>
        </div>
    )
}

export default FoodItems
