import React, { useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../Context/StoreContext';
import "./verify.css"
import axios from "axios"

const Verify = props => {
    const [searchParam,setparams] = useSearchParams();
    const success = searchParam.get("success")
    const orderId = searchParam.get("orderId")
    const {url} = useContext(StoreContext)
    const navigate = useNavigate()
   
    console.log(success,orderId)

    const verifypayment = async() =>{
        const response = await axios.post(url+"/api/order/verify",{success,orderId})
        if(response.data.success)
        {
           navigate("/myorders")
        }
        else{
            navigate("/")
        }
    }

    useEffect(()=>{
        verifypayment()
    },[])
  return (
    <div className='verify'>
     <div className="spinner">

     </div>
    </div>
  )
}

Verify.propTypes = {

}

export default Verify
