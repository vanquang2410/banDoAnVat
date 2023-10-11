import Router from 'express'
import ProductController from "../controllers/product.controller.js"
import Authen from '../middlewares/authen.js'

const {addProduct}= new ProductController()
const {verifyTokenTokenAdmin}= new Authen()

const ProductRouter = Router()

ProductRouter.post('/add',verifyTokenTokenAdmin,addProduct)

export default ProductRouter