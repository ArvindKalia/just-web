const tokenService=require("../services/token.service")
const dbService=require("../services/database.service")

const checkUserLogged=async(request)=>{
const tokenData= await tokenService.verifyToken(request)
if(tokenData.isVerify)
    {
        const query={
            token: request.cookies.authToken,
            isLogged:true
        }
        const userData= await dbService.getRecordByQuery(query,"userSchema")
        // console.log(userData)
        if(userData.length>0)
            {
                return true
            }
        else{
            return false
        }
    }
else{
    return false
}
}

module.exports={
    checkUserLogged
}