import modelOrders from '../models/order.model.js'
import modelProduct from '../models/product.model.js'
import modelCart from '../models/cart.model.js'
import mongoose from "mongoose";
export default class OrderService {
    constructor(){
        this.modelOrders=modelOrders
        this.modelProduct=modelProduct
    }


    getOrders(id){
        return new Promise(async(resolve, reject) => {
            try {
                if (!id)throw new Error('you must have id')
                var order =  await this.modelOrders.find({user_id:new mongoose.Types.ObjectId(id)}).populate('user_id product.product_id')
                resolve(order)
            } catch (error) {
                reject(error)
            }
            
        })
       
    }
   async addOrders (idUser , product ,address){
       try {
        if(!product) throw new Error('cart is empty')
          var addOrders= await this.modelOrders.create({
            user_id:idUser,
            product:product,
            shipping_address:address,
            time:Date.now(),
            status:'waiting'
          })
          var removeCart= await modelCart.deleteMany({user_id:idUser})
          return {addOrders:"success"}
       } catch (error) {
        console.log(error);
        throw error
       }
    }
    async deleteOrders (idOrders){
        try {
            var deleteOrder =await this.modelOrders.deleteOne({_id:new mongoose.Types.ObjectId(idOrders)})
            return {deleteOrders:"success"}
        } catch (error) {
            throw error
        }
    }
}