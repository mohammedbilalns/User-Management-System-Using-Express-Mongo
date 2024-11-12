
import express from "express"
import { log } from "mercedlogger"
import nocache from "nocache"

import userRoutes from "../routes/user.js"
import adminRoutes from "../routes/admin.js"
import connnectDb from "../db/connect.js"
import session from "express-session"

const app = express()

const PORT = process.env.PORT  // set  port 

app.set("view engine", "ejs")

app.set('view cache', false);


app.use(nocache())
app.use(session({secret:"mySecret", resave:false, saveUninitialized:true, cookie:{maxAge:1000*60*60*24}}))

app.use(express.static('static')) // static Middlewares
app.use(express.json()) // parse json 
app.use(express.urlencoded({ extended: false })) // parse req body

app.use('/user', userRoutes) // user route 
app.use('/admin', adminRoutes) // admin route 


app.use((req, res) => {
  res.status(404).send('Invalid URL');  
});



connnectDb()

// listen to the port 
app.listen(PORT, () => {
    log.green('SERVER STATUS', `server running on port: ${PORT}`)
})







