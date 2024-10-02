import React, { useContext, useEffect, useState } from 'react';
import './Cart.css';
import { StoreContext } from '../../Context/StoreContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { food_list, cartItems, removeFromCart, url, getTotalCartAmount } = useContext(StoreContext);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const calculateTotal = () => {
      let newTotal = 0;
      food_list.forEach(item => {
        if (cartItems[item._id] > 0) {
          newTotal += item.price * cartItems[item._id];
        }
      });
      setTotal(newTotal);
    };

    calculateTotal();
  }, [food_list, cartItems]);

  return (
    <>
      <div className="cart">
        <div className="cart-items">
          <div className="title">
            <li>Item No</li>
            <li>Title</li>
            <li>Price</li>
            <li>Quantity</li>
            <li>Remove</li>
          </div>
          <br />
          <hr />
          {food_list.map((item) => {
            if (cartItems[item._id] > 0) {
              return (
                <div key={item._id} className="cart-item">
                  <img src={`${url}/images/${item.image}`} />
                  <li>{item.name}</li>
                  <li>{item.price}</li>
                  <li>{cartItems[item._id]}</li>
                  <li>
                    <button onClick={() => removeFromCart(item._id)}>Remove</button>
                  </li>
                </div>
              );
            }
            return null;
          })}

        </div>
        </div>
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
              <p>{getTotalCartAmount()+2}</p>
            </div>
        <Link to="/PlaceOrder"><button>Proceed To Pay</button></Link>
          </div>
        </div>
      </div>
      
    </>
  );
};

export default Cart;
