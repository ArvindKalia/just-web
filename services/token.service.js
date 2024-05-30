require("dotenv").config()
const secretKey=process.env.SECRET_KEY
const jwt=require("jsonwebtoken")

const create=async(request,expiresIn)=>{
    const formData=request.body
    const endPoint=request.get("origin")
    const api= request.originalUrl
    const iss= endPoint+api
    // console.log(formData)
    const token= await jwt.sign({
        iss:iss,
        data:formData
    },secretKey,{expiresIn:expiresIn})
    return token;
}

module.exports={
    createToken:create
}