import userSchema from "../model/userModel.js";
import { log } from "mercedlogger";
import bcrypt from "bcrypt"


const saltRounds = 10 
const loadLogin = (req, res)=>{
    res.render('user/login')
}

const loadRegister = (req,res)=>{
    res.render('user/signup')
}

const registerUser = async (req,res)=>{
    try{
        const {username,email, password} = req.body

        const user =  await userSchema.findOne({username}) 
        if(user) return res.render('user/signup', { message:"User already exists", alertType:"error"})
        const mail = await userSchema.findOne({email})
        if(mail) return res.render('user/signup', {message:"Email is already used by another user", alertType:"error"})
        
        const hashedPassword = await bcrypt.hash(password, saltRounds)
        const newUser = new userSchema({
            username,
            email,
            password: hashedPassword
        })
       
        await newUser.save()
        res.render('user/login',{message:"user created successfully", alertType:"success"})
    }
    catch(error){
        log.red("ERROR", error)
        res.render('user/signup', {message:"Something went wrong", alertType:"error"})
    }
}

const login = async (req,res)=>{
    
    try{
        const {username, password} = req.body
        const user = await userSchema.findOne({username})
        if(!user) return res.render('user/login',{message:"User does not exists", alertType:"error"})
        
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) return res.render('user/login', {message:"Incorrect Password", alertType:"error"})
        
            req.session.user = {
                id: user._id,
                username: user.username,
                email: user.email
            };

        res.render('user/index', {username: req.session.username, isLoginned: true})
    }catch(error){
        log.red("ERROR",error)
        res.render('user/login', {message:"Something went wrong", alertType:"error"})

    }

}

const loadHome = (req, res)=>{
    res.render('user/index', {usermame: req.session.username, isLoginned: true })
}

const logout = (req, res)=>{
    req.session.destroy((err) => {
        if (err) {
            log.red("ERROR", err);
        }
        res.redirect('/user/login');
    });
}

export default {loadLogin, loadRegister,  registerUser, login, loadHome, logout}