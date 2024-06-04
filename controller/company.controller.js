const tokenService=require("../services/token.service")
const createCompany=async(request,response)=>{
    const token= await tokenService.verifyToken(request)
    console.log(token)
}

module.exports={
    createCompany
}