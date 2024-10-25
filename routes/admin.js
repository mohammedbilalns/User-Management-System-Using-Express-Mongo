import express from "express"
import { Router } from "express"

const router = Router()

router.use(express.static('static'))

router.get('/login', (req,res)=>{
    res.render('admin/login')    
})



export default router