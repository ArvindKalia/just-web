// require("dotenv").config()
// const secretKey=process.env.SECRET_KEY
// const jwt=require("jsonwebtoken")
// const ajax=require("supertest")
const express=require("express")
const router=express.Router()
const tokenRequest=require("../services/token.service")
const httpRequest=require("../services/http.service")

    router.post("/",async(request,response)=>{
        let expiresIn=120
        const token=await tokenRequest.createToken(request,expiresIn)
        // console.log(token)
        httpRequest.postRequest({
            endPoint:request.get("origin"),
            api: "/api/private/company",
            data:token
        })
    })

module.exports= router