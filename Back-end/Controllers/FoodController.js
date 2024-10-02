import FoodModel from "../Models/FoodModel.js";
import fs from "fs"

const addFood = async (req, res) => {
    try {
        const image_filename = req.file.filename;
        const food = new FoodModel({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            image: image_filename
        });

        await food.save();
        res.json({ success: true, message: "Food item added successfully" });
    } catch (error) {
        console.error("Error adding food:", error);
        res.json({ success: false, message: "Error adding food item" });
    }
};

const listFood = async(req,res)=> {
    try {
        const foods = await FoodModel.find({})
        res.json({success:true,data:foods})
    }catch(error)
    {
        console.log(error)
        res.json({success:false,message:error})
    }
}

const remove = async(req,res) => {
    try{
        const food =  await FoodModel.findById(req.body.id);
        fs.unlink(`Uploads/${food.image}`, ()=>{})
        await FoodModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Food removed successfully" });
    }
    catch(error)
    {
        
        console.log(error)
        res.json({success:false,message:"error"})
    }
}


export { addFood, listFood, remove};
