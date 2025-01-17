const express=require("express")
const tokenService = require("../services/token.service")
const httpService = require("../services/http.service")
const bcryptService=require("../services/bcrypt.service")

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
    // console.log(companyRes)
    if(companyRes.isCompanyExists)
        {
            const uid=companyRes.data[0]._id
            const query={
                body:{
                    uid:uid
                },
                endPoint: request.get("origin"),
                originalUrl: request.originalUrl
            }
            const uidToken=await tokenService.createCustomToken(query,expiresIn)
            // console.log(uidToken)
            //Get user ID
            const userRes=await httpService.getRequest({
                endPoint: request.get("origin"),
                api: "/api/private/user",
                data: uidToken
            })

            // Get user password
            // console.log(userRes)
            if(userRes.isCompanyExists)
                {
                    // if(userRes.data[0].isLogged){
                    //     response.status(406)
                    //     response.json({
                    //         message:"Please logout from other device"
                    //     })
                    //     return false
                    // }
                    const realPassword=userRes.data[0].password
                    // console.log(realPassword)
                    const isLogged= await bcryptService.decrypt(realPassword,request.body.password)
                    // console.log(isLogged)
                    if(isLogged)
                        {
                            const oneDayInSeconds=86400
                            const authToken= await tokenService.createCustomToken(query,oneDayInSeconds)
                            const dbToken= await httpService.putRequest({
                                endPoint:request.get("origin"),
                                api: "/api/private/user",
                                data: authToken
                            })
                            response.cookie("authToken",authToken,{maxAge:oneDayInSeconds*1000})
                            response.status(200)
                            response.json({
                                isLogged:true,
                                message: "Success"
                            })
                        }
                        else
                        {
                            response.status(401)
                            response.json({
                                isLogged:false,
                                message: "Password Incorrect !"
                            })

                        }
                }
            else
                {
                    //Now this is a diect gateway response --->
                    response.status(userRes.status)
                    //<-----------
                    response.json(userRes)
                }
        }
        else{
            //Now this is a diect gateway response --->
            response.status(404)
             //<-----------
            response.json(companyRes)
        }
})

module.exports=router