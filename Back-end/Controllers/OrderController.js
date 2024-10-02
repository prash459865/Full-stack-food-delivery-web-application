import OrderModel from "../Models/OrderModel.js";
import userModel from "../Models/userModel.js"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const frontend_url = "http://localhost:5173"

//placing user order from frontend
const placeorder = async(req,res)=>{
    try {
        const neworder = new OrderModel({
            userId:req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address
        })
        await neworder.save();
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}})

        const line_item = req.body.items.map((item)=>({
               price_data:{
                currency:"inr",
                product_data:{
                    name:item.name
                },
                unit_amount:item.price*100*80
               },
               quantity:item.quantity
        }))
        line_item.push({
            price_data:{
                currency:"inr",
                product_data:{
                    name:"Delivery charges"
                },
                unit_amount:2*100*80
            },
            quantity:1

        })
        const session = await stripe.checkout.sessions.create({
            line_items:line_item,
            mode:'payment',
            success_url:`${frontend_url}/verify?success=true&orderId=${neworder._id}`,
            cancel_url:`${frontend_url}/verify?success=false&orderId=${neworder._id}`

        })
        res.json({success:true,session_url:session.url})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Erroe"})
    }
}

const verifyOrder = async(req,res) =>{
   const {orderId,success} = req.body
   try {
    if(success == "true")
    {
        await OrderModel.findByIdAndUpdate(orderId,{payment:true})
        res.json({success:true,message:"Paid"})
    }
    else{
        await OrderModel.findByIdAndDelete(orderId);
        res.json({success:false,message:"Not Paid"})
    }
   } catch (error) {
      console.log(error)
      res.json({success:false,message:"Error"})
   }
}
//users orders for frontend
const userOrders = async(req,res) =>{
   try {
    const orders = await OrderModel.find({userId:req.body.userId})
    res.json({success:true,data:orders})
   } catch (error) {
    console.log(error)
    res.json({success:false,message:"Error"})
   }
}
  // Listing orders for admin pannel
  const ListOrders = async(req,res)=>{
        try {
            const orders = await OrderModel.find({});
            res.json({success:true,data:orders})

        } catch (error) {
            console.log(error);
            
            res.json({success:false,message:"Error"})

        }
  }
  //text API for updating status
  const updateStatus = async(req,res) =>{
     try {
        await OrderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
        res.json({success:true,message:"Status Upadated"})

     } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})

     }
  }
export {placeorder,verifyOrder,userOrders,ListOrders,updateStatus}