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
const createCustomToken=async(data,expiresIn)=>{
    const formData=data.body
    const endPoint=data.endPoint
    const api= data.originalUrl
    const iss= endPoint+api
    // expiresIn=120
    // console.log(formData)
    const token= await jwt.sign({
        iss:iss,
        data:formData
    },secretKey,{expiresIn:expiresIn})
    return token;
}

const verify=async(request)=>{
    let token= ""
    if(request.method=="GET")
        {
            token=request.headers['x-auth-token']
            // console.log(token)
        }
    else{
        token=request.body.token
    }
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
                        isVerify:false
                    }
                }
                
            }
            catch(error)
            {
                return{
                    isVerify:false
                }
            }
        }
        else{
            return{
                isVerify:false
            }
        }
}

module.exports={
    createToken:create,
    verifyToken:verify,
    createCustomToken
}