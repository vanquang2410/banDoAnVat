import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import model from '../models/product.model.js'
import mongoose from "mongoose";


export default class productService{
    constructor(){
        this.model = model
    }

    getProduct =()=>{
        return new Promise(async(resolve, reject) => {
            try {
                var product = await this.model.find({});
                resolve(product)
            } catch (error) {
                reject(error)
            }
            
        })
    }

    addProduct = (name, price,image,discount)=>{
        return new Promise(async(resolve, reject) => {
            try {
                if(!name||!price||image)throw new Error('you need more information ')
                let addProduct = await this.model.create({
                      name :name, 
                      price:price, 
                      image:image,
                      discount:discount
                })
                resolve({add_product:"success"})
            } catch (error) {
                reject(error)
            }
        })
    }



    updateProduct =(name, price,image,discount,id)=>{
        return new Promise(async(resolve, reject) => {
            try {
                if (!name||!price||image||discount){
                    throw new Error('you need more information ')
                }
                let updateProduct= await this.model.updateOne({_id:new mongoose.Types.ObjectId(id)},{
                    name:name,
                    price:price, 
                    discount:discount,
                    image:image
                })
                resolve({update:"success"})
            } catch (error) {
                reject(error)
                
            }
        })
    }
    deleteProduct =(id)=>{
        return new Promise(async(resolve, reject) => {
            try {
                if (!id)throw new Error('id is not exist')
                let deleteProduct = await this.model.deleteOne({_id:new mongoose.Types.ObjectId(id)})
                resolve({delete:"success"})
            } catch (error) {
                reject(error)
            }
           
        })
    }

}