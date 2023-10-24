import modelOrders from '../models/order.model.js'
import modelProduct from '../models/product.model.js'
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
                var order =  await this.modelOrders.find({user_id:new mongoose.Types.ObjectId(id)})
                resolve(order)
            } catch (error) {
                reject(error)
            }
            
        })
       
    }
   async addOrders (idUser , idCart ,address){
       try {
        
        const convertIdCart= JSON.stringify(idCart)
        let convertStringToArray=[]
       JSON.parse(convertIdCart).forEach(element => {
        convertStringToArray.push(new mongoose.Types.ObjectId(element))
       });
        console.log(convertStringToArray);
          var addOrders= await this.modelOrders.create({
            user_id:idUser,
            cart_id:convertStringToArray,
            shipping_address:address,
            status:'waiting'
          })
          
          return {addOrders:"success"}
       } catch (error) {
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