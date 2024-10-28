import express from "express"
import { Router } from "express"
import adminController from "../controller/adminController.js"
import adminAuth from "../middlewares/adminAuth.js"

const router = Router()

router.use(express.static('static'))

router.get('/login',adminAuth.isLogin,adminController.loadLogin )
router.get('/dashboard',adminAuth.checkSession, adminController.loadDashBoard)
router.post('/login' ,adminController.login)
router.get('/logout', adminAuth.checkSession,adminController.logout )
router.post('/addusers',adminAuth.checkSession, adminController.addusers )

export default router