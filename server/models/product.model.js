import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs"



const userSchema= Schema ({
    email:{
        type:String,
        require:true,
        match:[
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please enter a valid email",
        ],
        trim:true,
        unique:true
    },
    name:{
        type:String, 
        require:true , 
        trim:true
    }, 
    password:{
        type:String, 
        require:[true,"Please add your password"], 
        minLength:[6,"Password must be up to 6 characters"]
    }, 
    shipping_address:{
        type:String, 
        require:true
    }
})