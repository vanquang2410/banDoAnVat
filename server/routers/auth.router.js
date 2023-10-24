import {Router} from 'express'
import AuthController from '../controllers/auth.controller.js'



const {login,logout,register,refreshToken}= new AuthController()
const authRouter = Router()
authRouter.post("/login",login)
authRouter.post('/logout',logout)
authRouter.post("/register",register)
authRouter.post("/refresh",refreshToken)

export default authRouter;