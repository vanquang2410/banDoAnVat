import { Router } from "express";
import CartController from "../controllers/cart.controller.js";
import Authen from '../middlewares/authen.js'


const {verifyTokenTokenAdmin,verifyToken}= new Authen()
const {getCart,addCart,updateCart,deleteCart} = new CartController()
const cartRouter= Router()
 cartRouter.get('/',verifyToken,getCart)
 cartRouter.post('/',verifyToken,addCart)
cartRouter.put('/',verifyToken,updateCart)
cartRouter.delete('/:idCart',verifyToken,deleteCart)
 export default cartRouter