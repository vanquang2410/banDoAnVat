import Router from 'express'
import ProductController from "../controllers/product.controller.js"
import Authen from '../middlewares/authen.js'

const {addProduct,getProduct,updateProduct,deleteProduct}= new ProductController()
const {verifyTokenTokenAdmin,verifyToken}= new Authen()

const ProductRouter = Router()

ProductRouter.post('/add',verifyTokenTokenAdmin,addProduct)
ProductRouter.get('/',verifyToken,getProduct)
ProductRouter.put('/update/:id',verifyTokenTokenAdmin,updateProduct)
ProductRouter.delete('/delete/:id',verifyTokenTokenAdmin,deleteProduct)

export default ProductRouter