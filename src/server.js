
import express from "express"
import { log } from "mercedlogger"
import dotenv from "dotenv"
// import collection from "./db/user.js"
import userRoutes from "../routes/user.js"
import adminRoutes from "../routes/admin.js"
import connnectDb from "../db/connect.js"
// import path from "path"
// import morgan from " morgan"
// import cors from "cors"



const app = express()
dotenv.config() // load environment variables 
const PORT = process.env.PORT  // set  port 

app.set("view engine", "ejs")


app.use(express.static('static')) // static Middlewares
app.use(express.json()) // parse json 
app.use(express.urlencoded({ extended: false })) // parse req body

app.use('/user', userRoutes) // user route 
app.use('/admin', adminRoutes) // admin route 
// app.use(cors())
// app.use(morgan("tiny")) // log request for debugging





connnectDb()

// listen to the port 
app.listen(PORT, () => {
    log.green('SERVER STATUS', `server running on port: ${PORT}`)
})







