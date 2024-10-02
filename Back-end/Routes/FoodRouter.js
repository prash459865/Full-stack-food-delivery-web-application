import express from "express";
import { addFood, listFood, remove } from "../Controllers/FoodController.js";
import multer from "multer";

const FoodRouter = express.Router();

// Image storage engine
const storage = multer.diskStorage({
    destination: "Uploads",
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

// Route to add food
FoodRouter.post("/add", upload.single('image'), addFood);
FoodRouter.get("/list",listFood)
FoodRouter.post("/remove",remove)

export default FoodRouter;
