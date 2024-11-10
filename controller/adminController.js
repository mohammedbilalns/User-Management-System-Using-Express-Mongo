import adminModel from "../model/adminModel.js";
import userModel from "../model/userModel.js";
import { log } from "mercedlogger";
import bcrypt from "bcrypt"


const loadLogin = async (req, res) => {

    res.render("admin/login")
}

const loadDashBoard = async (req, res) => {

    try {
        const admin = req.session.admin
        if (!admin) return res.render("admin/login")

        const users = await userModel.find({})
        res.render("admin/dashboard", { users, isAdminLoginned: true })
    } catch (error) {
        log.red("ERROR", error)
    }

}


const login = async (req, res) => {

    try {
        const { email, password } = req.body
        const admin = await adminModel.findOne({ email: email })

        if (!admin) return res.render('admin/login', { message: "Admin does not exists", alertType: "error" })

        const isMatch = await bcrypt.compare(password, admin.password)

        if (!isMatch) return res.render('admin/login', { message: "Incorrect Password", alertType: "error" })
        req.session.admin = true
        res.redirect('/admin/dashboard')
    } catch (error) {
        log.red("ERROR", error)
        res.render('admin/login', { message: "Something went wrong", alertType: "error" })
    }
}

const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            log.red("ERROR", err);
        }
        res.redirect('/admin/login');
    });
}

const addusers = async (req, res) => {
    try {
        const { username, email, password } = req.body
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new userModel({ username, email, password: hashedPassword })


        await newUser.save()

        res.redirect('/admin/dashboard')
    } catch (error) {
        log.red("ERROR", error)
        res.redirect('/admin/dashboard')
    }
}

const deleteUser = async (req, res) => {
    try {

        const id = req.params.id
        
        await userModel.findByIdAndDelete(id)
        res.redirect('/admin/dashboard')
    } catch (error) {
        log.red("ERROR",error)
    }
}


const editUser = async (req,res)=>{
    try{
        const id = req.params.id
        const {username, email, password} = req.body
        if(!password){ 
            await userModel.findOneAndUpdate({_id:id}, {$set:{username, email}})
        }else{
            const hashedPassword = await bcrypt.hash(password, 10)
            const user = await userModel.findOneAndUpdate({_id:id}, {$set:{username, email, password: hashedPassword}})
        }
        res.redirect('/admin/dashboard')

    }catch(error){
        log.red("ERROR", error)
    }
}

export default { loadLogin, loadDashBoard, login, logout, addusers, deleteUser, editUser }