import express from "express"
import { Router } from "express"
import userController from "../controller/userController.js"
import auth from "../middlewares/auth.js"
const router = Router()

router.use(express.static('static'))

router.get('/login',auth.isLogin, userController.loadLogin)


router.get('/signup',auth.isLogin ,userController.loadRegister)

router.post('/signup',userController.registerUser  )


router.post('/login',userController.login )

router.get('/home', auth.checkSession,userController.loadHome )

router.get('/logout', auth.checkSession, userController.logout)

export default router