import { createContext, useState, useEffect } from "react";
import axios from 'axios';
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const url = "http://localhost:4000"
    const [token, settoken] = useState("");
    const [food_list, setFoodList] = useState([]); // For loading food items from the database

    const getTotalCartAmount = ()=>{
        let totalAmount = 0
        for(const items in cartItems)
        {   
            if(cartItems[items]>0)
            {
            let itemInfo = food_list.find((product)=>product._id===items)
            totalAmount += itemInfo.price* cartItems[items]
            }
        }
        return totalAmount
    }




    // Fetch the list of food items from the server
    const Fetchfoodlist = async () => {
        const response = await axios.get(url + "/api/food/list");
        setFoodList(response.data.data);
    };

    // Add item to cart
    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
        } else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }
        if (token) {
            await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
        }
    };

    // Remove item from cart
    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        if (token) {
            const response = await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
            setCartItems(response.data.cartData);
        }
    };

    // Load cart data from the server
    const LoadCartData = async (token) => {
        const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } });
        setCartItems(response.data.cartData); // Update the local state with the fetched cart data
    };

    useEffect(() => {
        async function loadData() {
            await Fetchfoodlist();
            const storedToken = localStorage.getItem("token");
            if (storedToken) {
                settoken(storedToken);
                await LoadCartData(storedToken); // Load cart data if the token is available
            }
        }
        loadData();
    }, []);

    const contextValue = {
        food_list,
        cartItems,
        url,
        token,
        setCartItems,
        addToCart,
        removeFromCart,
        settoken,
        getTotalCartAmount
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
