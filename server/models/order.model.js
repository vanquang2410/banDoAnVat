import { Schema, model } from "mongoose";



const orderSchema=Schema({
    user_id:{
        type:Schema.Types.ObjectId,
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
    total_price:{
        type:Number
    }, 
    shipping_address:{
        type:String, 
        require:true
    }, 
    status:{
        type:String, 
        require:true
    }

},{
    timestamps: true,
})