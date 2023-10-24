import { Schema, model } from "mongoose";



const orderSchema=Schema({
    user_id:{
        type:Schema.Types.ObjectId,
        ref:'user-food-app'
    },
    cart_id:[
        {
            type:Schema.Types.ObjectId,
            ref:'cart-food-app'
        }
    ]
   , 
     
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
export default model("order-food-app",orderSchema)