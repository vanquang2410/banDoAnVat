import { Schema, model } from "mongoose";

const cartSchema = Schema({
    user_id :{
        type:Schema.Types.ObjectId, 
        ref:'user-food-app'
    }, 
    product_id:
       {
        type:Schema.Types.ObjectId,
        ref:"product-food-app"
       }
    , 
    quantity:{
        type:Number,
        require:true
    }
    ,
    total_price:{
        type:Number
    }, 
}, 
{
    timestamps: true,
})
export default model("cart-food-app",cartSchema)