require("dotenv").config()
const secretKey=process.env.SECRET_KEY
const jwt=require("jsonwebtoken")
const issService=require("./iss.service")

const create=async(request,expiresIn)=>{
    const formData=request.body
    const endPoint=request.get("origin")
    const api= request.originalUrl
    const iss= endPoint+api
    expiresIn=120
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
                const tmp= await jwt.verify(token,secretKey)
                // console.log(tmp)
                const requestComingFrom= tmp.iss
                if(issService.indexOf(requestComingFrom)!=-1)
                    {
                        return{
                            isVerify:true,
                            data:tmp.data
                        }
                    }
                else{
                    return{
                        isVerified:false
                    }
                }
                
            }
            catch(error)
            {
                return{
                    isVerified:false
                }
            }
        }
}

module.exports={
    createToken:create,
    verifyToken:verify
}