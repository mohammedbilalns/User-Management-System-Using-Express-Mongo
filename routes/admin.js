import express from "express"
import { Router } from "express"
import adminController from "../controller/adminController.js"
const router = Router()

router.use(express.static('static'))

router.get('/login',adminController.loadLogin )
router.get('/dashboard', adminController.loadDashBoard)
router.post('/login', adminController.login)

export default router