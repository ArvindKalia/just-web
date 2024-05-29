require("dotenv").config()
const express=require("express")
const router=express.Router()
const ajax=require("supertest")
const secretKey=process.env.SECRET_KEY
const jwt=require("jsonwebtoken")

    router.post("/",(request,response)=>{
        const formData=request.body
        // console.log(formData)
        const token=jwt.sign({
            iss:"",
            data:formData
        },secretKey,{expiresIn:120})
        console.log(token)
    })

module.exports= router