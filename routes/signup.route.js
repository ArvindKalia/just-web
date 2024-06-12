// require("dotenv").config()
// const secretKey=process.env.SECRET_KEY
// const jwt=require("jsonwebtoken")
// const ajax=require("supertest")
const express = require("express")
const router = express.Router()
const tokenRequest = require("../services/token.service")
const httpRequest = require("../services/http.service")

router.post("/", async (request, response) => {
    let expiresIn = 120
    const token = await tokenRequest.createToken(request, expiresIn)
    // console.log(token)
    const companyRes = await httpRequest.postRequest({
        endPoint: request.get("origin"),
        api: "/api/private/company",
        data: token
    })
    if (companyRes.isCompanyCreated) {
        const newUser = {
            body: {
                uid: companyRes.data._id,
                password: request.body.password
            },
            endPoint: request.get("origin"),
            originalUrl: request.originalUrl

        }
        const userToken = await tokenRequest.createCustomToken(newUser, expiresIn)
        // console.log(userToken)
        // console.log(newUser)
        const userRes = await httpRequest.postRequest({
            endPoint: request.get("origin"),
            api: "/api/private/user",
            data: userToken
        })
        response.json(userRes)
    }
    else {
        response.json(companyRes)
    }
})

module.exports = router