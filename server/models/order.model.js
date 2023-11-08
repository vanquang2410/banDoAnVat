import { Schema, model } from "mongoose";



const orderSchema=Schema({
    user_id:{
        type:Schema.Types.ObjectId,
        ref:'user-food-app'
    },
    product :[
        {
            product_id:
            {
             type:Schema.Types.ObjectId,
             ref:"product-food-app"
            },
            quantity:{
                type:Number,
                require:true
            }
         , 
        }
    ],
    shipping_address:{
        type:String, 
        require:true
    }, 
    status:{
        type:String, 
        require:true
    },
    time:{
        type:Date,
        require:true
    }

},{
    timestamps: true,
})
export default model("order-food-app",orderSchema)