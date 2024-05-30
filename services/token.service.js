require("dotenv").config()
const secretKey=process.env.SECRET_KEY
const jwt=require("jsonwebtoken")
const issService=require("./iss.service")

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

const verify=async(request)=>{
    const token= request.body.token
    if(token)
        {
            try{
                const tmp=jwt.verify(token,secretKey)
                const requestComingFrom= tmp.iss
                if(issService.indexOf(requestComingFrom)!=-1)
                    {
                        return true
                    }
                else{
                    return false
                }
                
            }
            catch(error)
            {
                return false
            }
        }
}

module.exports={
    createToken:create,
    verifyToken:verify
}