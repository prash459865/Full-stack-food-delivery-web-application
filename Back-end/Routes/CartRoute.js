import express from "express"
import {addToCart, removeFromCart, getCart} from "../Controllers/cardController.js"
import authMiddleawre from "../MiddleWare/Auth.js";

const cartRouter = express.Router(); //create express router

cartRouter.post("/add",authMiddleawre,addToCart)
cartRouter.post("/remove",authMiddleawre,removeFromCart)
cartRouter.post("/get",authMiddleawre,getCart)

export default cartRouter