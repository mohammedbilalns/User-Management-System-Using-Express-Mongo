
import express from "express"
import { log } from "mercedlogger"
import dotenv from "dotenv"
// import collection from "./db/user.js"
import userRoutes from "../routes/user.js"
import adminRoutes from "../routes/admin.js"
import connnectDb from "../db/connect.js"
import session from "express-session"
import helmet from "helmet"
// import morgan from " morgan"
// import cors from "cors"



const app = express()
dotenv.config() // load environment variables 
const PORT = process.env.PORT  // set  port 

app.set("view engine", "ejs")

app.set('view cache', false);

app.use((req, res, next) => {
    res.setHeader('Surrogate-Control', 'no-store');
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    next();
  }); // no cache

app.use(session({secret:"mySecret", resave:false, saveUninitialized:true, cookie:{maxAge:1000*60*60*24}}))

app.use(express.static('static')) // static Middlewares
app.use(express.json()) // parse json 
app.use(express.urlencoded({ extended: false })) // parse req body

app.use('/user', userRoutes) // user route 
app.use('/admin', adminRoutes) // admin route 
// app.use(cors())
// app.use(morgan("tiny")) // log request for debugging

app.use((req, res) => {
  res.status(404).send('Invalid URL');  // Assuming you have a 404.ejs or 404.pug view template
});



connnectDb()

// listen to the port 
app.listen(PORT, () => {
    log.green('SERVER STATUS', `server running on port: ${PORT}`)
})







