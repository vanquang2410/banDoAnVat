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
    },
    role:{
        type:String, 
        default:"user"
    }
})

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        return next()
    }
    
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(this.password, salt)
    this.password = hashedPassword
    next()
})


export default model("user-food-app",userSchema)