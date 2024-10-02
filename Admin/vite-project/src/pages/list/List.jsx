import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./List.css"

const List = () => {
  const url = "http://localhost:4000";
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching list:', error);
    }
  };

  useEffect(() => {
    fetchList();
  }, []); // Empty dependency array means this effect runs only once
   
  const handleDelete = async(foodid)=> {
      const response = await axios.post(`${url}/api/food/remove`,{id:foodid})
      await fetchList();
  }  

  return (
    <div className='list-box'>
      <p>List</p>
      <div className='headings'>
        <b>image</b>
        <b>name</b>
        <b>category</b>
        <b>price</b>
        <b>action</b>
      </div>
      {
        list.map((item, index) => (
          <div key={index} className="list-table">
            <img src={`${url}/images/${item.image}`} alt={item.name} />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>{item.price}</p>
            <p className='cross' onClick={() => handleDelete(item._id)}>X</p> {/* Add a function to handle delete */}
          </div>
        ))
      }
    </div>
  );
};

export default List;
