import express from "express"
import cors from "cors"
import { connectDB } from "./Config/DB.js"
import FoodRouter from "./Routes/FoodRouter.js"
import userRouter from "./Routes/userRoute.js"
import "dotenv/config.js"
import cartRouter from "./Routes/CartRoute.js"
import orderRouter from "./Routes/orderRoute.js"


//add config
const app = express()
const port = 4000

//middleware
app.use(express.json())
app.use(cors())

//db connection
connectDB();

//api endpoints
app.use("/api/food",FoodRouter)
app.use("/images",express.static('Uploads'))
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)



app.get("/",(req,res)=>{
       res.send("API woing")
})

app.listen(port,()=>{
    console.log(`server started omn port ${port}`)
})

//mongodb+srv://prashantawasthi251:Rowdyrat@cluster0.ntjhnii.mongodb.net/?