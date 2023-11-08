import model from '../models/cart.model.js'
import modelProduct from '../models/product.model.js'
import mongoose from "mongoose";
export default class CartService{
    constructor(){
        this.model = model
        this.modelProduct=modelProduct
    }
    getCart = (id)=>{
        return new Promise(async(resolve, reject) => {
            try {
                if(!id)throw new Error('you must have id')
                var cart = await this.model.find({user_id:id}).populate('product_id')
                resolve(cart)
            } catch (error) {
                reject(error)
            }
        })
    }
    addCart = (idUser,productId, quantity)=>{
        return new Promise(async(resolve, reject) => {
            try {
                if (!productId||!quantity)throw new Error('you need more information')
                const check = await this.modelProduct.findOne({_id:productId})
                if (!check)throw new Error ("This product is not in our store ")
                const productInCheck = await this.model.findOne({product_id:productId,user_id:idUser})
                if(productInCheck) throw new Error('you have added this product in cart')
                const priceOfProduct = check.price
                const addCart = this.model.create({
                   user_id:idUser,
                   product_id:productId,
                   quantity:quantity,
                   total_price:priceOfProduct*quantity
            })
               resolve({addCart:'success'})
            } catch (error) {
                reject(error)
            }
        })
    }
    updateCart =async(productId,quantity) =>{
        try {
            if (!productId||!quantity)throw new Error('you need more information')
            const checkPromise =  this.modelProduct.findOne({_id:productId})
            const productInCheckPromise =  this.model.find({product_id:productId})
            const [check,productInCheck]= await Promise.all([checkPromise,productInCheckPromise])
            if (!check)throw new Error ("This product is not in our store ")
            if(!productInCheck) throw new Error('You have not added this product to your cart')
     
            const updateCart = await this.model.updateOne({product_id:productId},{
                total_price:check.price*quantity,        
                quantity:quantity})
            return ({updateCart:"success"})
        } catch (error) {
            throw error
        }
    }
    deleteCart = (idCart)=>{
        return new Promise(async(resolve, reject) => {
            try {
                
                if(!idCart)throw new Error('you need more information')
                console.log(idCart);
                const checkIdCart = await  this.model.findOne({_id:new mongoose.Types.ObjectId(idCart)})
               if(!checkIdCart)throw new Error('this cart is not invalid')
                const check = await this.model.deleteOne({_id:idCart}) 
                resolve({delete_cart:'success'})
            } catch (error) {
                reject(error)
            }
        })
        
    }
}