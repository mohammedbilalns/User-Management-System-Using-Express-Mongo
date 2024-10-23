
import express from "express"
import ejs from "ejs"

const app = express()
const port = 3000 
const __dirname = import.meta.pat

app.use(express.static('static'))
app.use(express.static('dist'))



app.get("/", (req, res)=>{
    res.render("index.ejs")
})

app.get("/login", (req, res)=>{
    res.render("login.ejs")
})

app.get("/signup", (req , res)=>{
    res.render("signup.ejs")
})

app.get("/adminlogin", (req, res)=>{
    res.render("adminlogin.ejs")
})




app.listen(port, ()=>{
    console.log(`server running on port: ${port}`)
})







