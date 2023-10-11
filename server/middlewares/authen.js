import jwt from "jsonwebtoken";
import model from '../models/product.model.js'

export default class Authen{
    generateToken = (id) => {
        return jwt.sign({ id }, "taotoken", {
          expiresIn: process.env.TIME_TOKEN,
        });
      };
    
    
    
    verifyTokenTokenAdmin =async(req,res,next)=>{
        try {
            // var token = req.headers.authorization.split(' ')[1]
            // console.log(token);
            console.log(global.blackListToken.includes(accessToken));
            if(token){
             let data=jwt.verify(token,'taotoken') 
             
             if(!data)throw new Error('token is not valid')
             var user=await model.findOne({_id:data.id})

             if(user.role!=='admin'){
                 throw new Error('this account is not admin')
             }
            

            if (user.role=='admin'){
                req.data=user;
                next()
             }
             
             
            }
            else throw new Error('you are not authenticated')
        } catch (error) {
            res.status(400)
            next(error)

        }
    }


    
    

    verifyToken =async (req,res,next) => {
        try {
             var accessToken =req.headers.authorization.split(' ')[1]
            // console.log(req.headers.authorization.split(' '));
            if(global.blackListToken.includes(accessToken)){
                throw new Error( "TOken invalid")
            }
            
            if(accessToken){
             let data=jwt.verify(accessToken,process.env.TOKEN_SECRET) 
          
             if(!data)throw new Error('token is not valid')
             var user=await model.findOne({_id:data.id})
             if(!user.active)throw new Error('this account is not active')
             req.user=user;
             console.log(user);
             next()
            }
            else throw new Error('you are not authenticated')
        } catch (error) {
            res.status(400)
            next(error)

        }
      

    };

}