import OrderService from "../services/order.service.js";

export default class OrderController {
    constructor (){
        this.service = new OrderService()
    }
    getOrder= async(req,res,next)=>{
        try {
            const getOrder= await   this.service.getOrders(req.user._id)
            res.json(getOrder)
        } catch (error) {
            res.status(400)
            next(error)
        }
    }

    addOrder=async(req,res,next)=>{
        try {
            const addOrder= await this.service.addOrders(req.user._id,req.body.idCart,req.body.address)
            res.json(addOrder)
        } catch (error) {
            res.status(400)
            next(error)
        }
    }

    deleteOrder= async(req,res,next)=>{
        try {
            const deleteOrder= await this.service.deleteOrders(req.body.idOrder)
            res.json(deleteOrder)
        } catch (error) {
            res.status(400)
            next(error)
        }
    }
}