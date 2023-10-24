import { Router } from "express";
import OrderController from "../controllers/orders.controller.js";
import Authen from '../middlewares/authen.js'

const {verifyTokenTokenAdmin,verifyToken}= new Authen()
const {getOrder,addOrder,deleteOrder} = new OrderController()

const orderRouter = Router()
orderRouter.get('/',verifyToken,getOrder)
orderRouter.post('/',verifyToken,addOrder)
orderRouter.delete('/',verifyToken,deleteOrder)


export default orderRouter