import authService from "../services/auth.service.js";


export default class AuthController {
    constructor (){
        this.service= new authService()
    }
    register = async(req,res,next) =>{
        try {
            res.json(await this.service.register(req.body))
        } catch (error) {
            res.status(400)
            next(error)
        }
    }

    login= async(req,res,next)=>{
        try {
            var token = await this.service.login(req.body)
            // res.cookie('accessToken',token.Accesstoken)
            // res.cookie('refreshToken',token.refreshToken)
            res.json(token)
            
        } catch (error) {
            res.status(400)
            next(error)
        }
    }

    refreshToken= async(req,res,next)=>{
        try {
            // console.log(req.body.accessToken,req.body.refreshToken);
            var refreshToken=await this.service.refreshToken(req.body.accessToken,req.body.refreshToken)
            res.json(refreshToken)

        } catch (error) {
            res.status(400)
            next(error)
        }     
    }

    
    logout= async(req,res,next)=>{
        try {
            // console.log(req.headers.authorization.split(' ')[1]);
             var logout= await this.service.logout(req.headers.authorization.split(' ')[1])
            // res.cookie('blacklist_Token',logout.blacklist_token)
            res.json(logout)
        } catch (error) {
            res.status(400)
            next(error)
        }
    }


    changePassword=async(req,res,next)=>{
        try {
            var update=await this.service.updatePassword(req.body)
            res.json(update)
        } catch (error) {
            res.status(400)
            next(error)
        }     
    }
}