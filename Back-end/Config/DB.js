import mongoose from "mongoose";

export const connectDB = async() =>{
            await mongoose.connect("mongodb+srv://prashantawasthi251:Rowdyrat@cluster0.ntjhnii.mongodb.net/food-order").then(()=>{
                console.log("DB connected")
            })
}