import { Schema, model } from "mongoose";

const cartSchema = Schema({
    user_id :{
        type:String, 
        ref:'user-food-app'
    }, 
    product:[
        {
           product_id:{
            type:Schema.Types.ObjectId,
            ref:"product-food-app"
           }, 
           quantity:{
            type:Number
           }
        }
    ], 
    quantity:{
        type:Number
    },
    total_price:{
        type:Number
    }, 
}, 
{
    timestamps: true,
})