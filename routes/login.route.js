const express=require("express")
const tokenService = require("../services/token.service")
const httpService = require("../services/http.service")

const router=express.Router()

router.post("/",async(request,response)=>{
    // response.json("Success")
    let expiresIn=120
    const token=await tokenService.createToken(request,expiresIn)
    const companyRes=await httpService.getRequest({
        endPoint: request.get("origin"),
        api: "/api/private/company",
        data: token
    })
    console.log(companyRes)
})

module.exports=router