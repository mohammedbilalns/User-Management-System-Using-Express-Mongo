import express from "express"
import { Router } from "express"
import userController from "../controller/userController.js"

const router = Router()

router.use(express.static('static'))

router.get('/login', userController.loadLogin)


router.get('/signup',userController.loadRegister)

router.post('/signup',userController.registerUser  )


router.post('/login',userController.login )

router.get('/home',userController.loadHome )

export default router