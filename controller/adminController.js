import adminModel from "../model/adminModel.js";
import { log } from "mercedlogger";
import bcrypt from "bcrypt"
import userModel from "../model/userModel.js"

const loadLogin = async (req, res)=>{

    res.render("admin/login")
}

const loadDashBoard = async (req, res) => {
    
    try{
        const admin = req.session.admin
        if(!admin) return res.render("admin/login")

        const  users = await userModel.find({})
        res.render("admin/dashboard", {users})
    }catch(error){
        log.red("ERROR", error)
    }
    
}


const login = async (req, res)=>{

    try{
        const {email, password} = req.body
        const admin = await adminModel.findOne({email:email})

        if(!admin) return res.render('admin/login', {message:"Admin does not exists", alertType:"error"})
        
        const isMatch = await bcrypt.compare(password, admin.password)

        if(!isMatch) return res.render('admin/login', {message:"Incorrect Password", alertType:"error" })
        req.session.admin = true
        res.redirect('/admin/dashboard')
    }catch(error){
        log.red("ERROR", error)
        res.render('admin/login',{message:"Something went wrong", alertType:"error"} )
    }
}



export default {loadLogin, loadDashBoard, login}