import React, { useEffect, useState } from 'react'
import { assets } from '../../assets/assets'
import "./Add.css"
import axios from "axios"

const Add = () => {
    const url = "http://localhost:4000";

    const[image,setimage] = useState(false)
    const[data,setdata] = useState({
                        name :"",
                        description:"",
                        price:"",
                        category:"Salad"

    });
    const changehandler = (event) =>{
         const name = event.target.name;
         const value = event.target.value;
         setdata(data => ({...data,[name]:value}))
    }
         
    const onsubmitHandler = async(event) =>{
          event.preventDefault();
          const formData = new FormData();
          formData.append("name", data.name);
          formData.append("price", Number(data.price));
          formData.append("description", data.description);
          formData.append("category", data.category);
          formData.append("image", image);
         // api call
         const response = await axios.post(`${url}/api/food/add`,formData)

         if(response.data.success)
         {
          setdata({
                        name :"",
                        description:"",
                        price:"",
                        category:"Salad"
          })  
          setimage(false)
         }
    }
    useEffect(()=>{
         console.log(data)
    },[data])
    return (
        <div className='Add'>
            <form  onSubmit={onsubmitHandler} className='form'>
                <div className="add-img">
                    <p>Upload Image</p>
                    <label htmlFor='image'>
                        <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
                    </label>
                    <input id='image' onChange={(e)=> setimage(e.target.files[0])} type="file" hidden required />
                </div>
                <div className="add-product-name">
                    <p>product name</p>
                    <input onChange={changehandler} value={data.name} type='text' name='name' placeholder='type here' />
                </div>
                <div className="added-product-description">
                    <p>Product Description</p>
                    <textarea onChange={changehandler} value={data.description} name='description' rows="7" placeholder='write Description' required></textarea>
                </div>
                <div className="add-price">
                    <div className="add-category">
                        <p>product category</p>
                        <select onChange={changehandler} name='category'>
                            <option value="Salad">Salad</option>
                            <option value="Rolls">Rolls</option>
                            <option value="Deserts">Deserts</option>
                            <option value="Sandwich">Sandwich</option>
                            <option value="Cake">Cake</option>
                            <option value="Pure Veg">Pure Veg</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Noodles">Noodles</option>
                        </select>
                    </div>
                    <div className="price">
                        <p>Product Price</p>
                        <input onChange={changehandler} value={data.price} type='number' name='price' placeholder='Enter Price' required/>
                    </div>
                </div>
                <button  className='add-button' type='submit'>ADD</button>
            </form>
        </div>
    )
}

export default Add
