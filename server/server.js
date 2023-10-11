import express from "express"
import cors from "cors"
import env from "dotenv"
import path from "path"
import { fileURLToPath } from 'url'
import ConnentDB from "./utils/mongoose.init.js"
import { errorHandler } from "./middlewares/handle.error.js"

import cookieParser from "cookie-parser"
import authRouter from "./routers/auth.router.js"
import ProductRouter from "./routers/product.router.js"
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);





const app = express()
const PORT = process.env.PORT || 4000




env.config()



app.use(cookieParser())

app.use(express.json())

app.use("/api/auth",authRouter)

app.use('/api/product',ProductRouter)

app.use(errorHandler)

ConnentDB().then((data) => {
    app.listen(PORT,() => {
        console.log(data)
        console.log("server is running on PORT",PORT);
    })
})
.catch((err) => {
    console.log("server is error on PORT",err);
})



