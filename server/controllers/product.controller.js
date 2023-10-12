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
            var addProduct = await this.service.addProduct(req.body.name,req.body.price,req.body.image,req.body.discount)
            res.json(addProduct)
        } catch (error) {
            res.status(400)
            next(error)
        }
    }
    updateProduct= async(req,res,next)=>{
        try {
            // console.log(req.params.id);
            var updateProduct = await this.service.updateProduct(req.body.name,req.body.price,req.body.image,req.body.discount, req.params.id)
            res.json(updateProduct)
        } catch (error) {
            res.status(400)
            next(error)
        }
    }

    deleteProduct= async (req,res,next)=>{
        try {
            // console.log(req.params.id);
            var deleteProduct = await this.service.deleteProduct(req.params.id)
            res.json(deleteProduct)
        } catch (error) {
            res.status(400)
            next(error)
        }
    }
}