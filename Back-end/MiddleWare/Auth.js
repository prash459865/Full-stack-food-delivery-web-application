import { response } from "express";
import jwt from  "jsonwebtoken"

const authMiddleawre = async(req,res,next) =>{
  const {token} = req.headers;
  if(!token)
  {
    return response.json({success:false,message:"not authorized Login Again"})
  }
  try{
       const token_decode = jwt.verify(token,process.env.JWT_SECRET)
       req.body.userID = token_decode.id
       next()
     }
     catch(error)
     {
          console.log(error)
          res.json({success:false,message:"error"})
     }
}

 export default authMiddleawre