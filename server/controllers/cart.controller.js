import CartService from "../services/cart.service.js";

export default class CartController{
    constructor(){
        this.service= new CartService()
    }
    getCart =async(req,res,next)=>{
       try {
        console.log(req.user._id);
        const getCart = await this.service.getCart(req.user._id)
        res.json(getCart)
       } catch (error) {
        res.status(400)
        next(error)
       }
    }
    addCart = async(req,res,next)=>{
        try {
            const addCart= await this.service.addCart(req.user._id,req.body.productID,req.body.quantity)
            res.json(addCart)
        } catch (error) {
            res.status(400)
            next(error)
        }
    }
    updateCart = async(req,res,next)=>{
        try {
            const updateCart = await this.service.updateCart(req.body.productID,req.body.quantity)
            
            res.json(updateCart)
        } catch (error) {
          
            res.status(400)
            next(error)
        }
    }
    deleteCart = async(req,res,next)=>{
        try {
            const deleteCart= await this.service.deleteCart(req.params.idCart)
            res.json(deleteCart)
        } catch (error) {
            res.status(400)
            next(error)
        }
    }
}