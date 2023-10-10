import express from "express"
import cors from "cors"
import env from "dotenv"
import path from "path"
import { fileURLToPath } from 'url'
import ConnentDB from "./utils/mongoose.init.js"
import { errorHandler } from "./middlewares/handle.error.js"
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);




const app = express()
const PORT = process.env.PORT || 5000


app.use(cookieParser())

app.use(express.json())




ConnentDB().then((data) => {
    app.listen(PORT,() => {
        console.log(data)
        console.log("server is running on PORT",PORT);
    })
})
.catch((err) => {
    console.log("server is error on PORT",err);
})



