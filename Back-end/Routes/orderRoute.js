import express from "express"
import authMiddleawre from "../MiddleWare/Auth.js"
import { placeorder, userOrders, verifyOrder ,ListOrders,updateStatus} from "../Controllers/OrderController.js"

const orderRouter = express.Router();

orderRouter.post("/place",authMiddleawre,placeorder);
orderRouter.post("/verify",verifyOrder)
orderRouter.post("/userOrders",authMiddleawre,userOrders)
orderRouter.get("/list",ListOrders)
orderRouter.post("/status",updateStatus)

export default orderRouter;
