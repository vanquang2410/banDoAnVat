import { Schema, model } from "mongoose";


const productSchema= Schema({
    name :{
        type:String, 
        require:true,
        trim:true
    }, 
    price:{
        type:Number, 
        require:true
    },
    discount:{
        type:Number,
        require:true
    } 
    ,
    image:{
        type:String, 
        require:true
    }, 

})
export default model("product-food-app",productSchema)