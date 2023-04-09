import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"
import routes from "./routes/ProductRoutes.js"
import { Error } from "./middleware/error.js"
import userRoutes from "./routes/userRoutes.js"
import cookieParser from "cookie-parser"
dotenv.config()

// unhandled Uncaught Exception   upper hi likhna shi nhi iske upper likha glat to wha se error aa jyega 
// like console.log(hekfhs) 
    
process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`)
    console.log("Shutting down there server due to unhandled uncaught exception ")
})

const app = express()
const DB_MONGOOSE = process.env.DB_MONGOOSE
const PORT = process.env.PORT

app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded())
app.use("/api/v1",routes)
app.use("/api/v1",userRoutes)
app.use(Error)


mongoose.connect(DB_MONGOOSE)
    .then(
        console.log("Database is connected")
    )
      //catch hta diya kyu ki ab humne unhandled error kar liya


const server= app.listen(PORT,()=>{
    console.log(`The server is connected on PORT: ${PORT}`)
})

// unhandled Promise Rejection
process.on("unhandledRejection",err=>{
    console.log(`Error: ${err.message}`)
    console.log("Shutting down there server due to unhandled Promise ")

    server.close(()=>{
        process.exit(1)
    })
    
})

