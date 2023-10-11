import productService from "../services/product.service.js";

export default class ProductController{
    constructor(){
        this.service = new productService();
    }


    getProduct =async(req,res,next)=>{
        try {
            res.json(await this.service.getProduct())
        } catch (error) {
            res.status(400)
            next(error)
        }
    }
    addProduct =async(req,res,next)=>{
        try {
            var addProduct = this.service.addProduct(req.body.name,req.body.price,req.body.image,req.body.discount)
            res.json(addProduct)
        } catch (error) {
            res.status(400)
            next(error)
        }
    }

}