const tokenService = require("../services/token.service")
const dbService = require("../services/database.service")

const createUser = async (request, response) => {
    // console.log(request.body)
    const token = await tokenService.verifyToken(request)
    // console.log(token)
    const data = token.data
    if (token.isVerify) {

        try {
            const userRes = await dbService.createRecord(data, "userSchema")
            // console.log(userRes)
            response.status(200)
            response.json({
                isUserCreated:true,
                message:"User Created"
            })
        }
        catch (error) {
            response.json({
                isUserCreated:false,
                message:"Internal Server Error"
            })
        }
    }
    else {
        response.status(401)
        response.json("Permission denied")
    }
}

const getUserPassword=async(request,response)=>{
    const token= await tokenService.verifyToken(request)
    // console.log(token)
    if(token.isVerify)
        {
            const uidFound=token.data
            const dataRes=await dbService.getRecordByQuery(uidFound,'userSchema')
            // console.log(dataRes)
            if(dataRes.length>0)
                {
                    response.status(200)
                    response.json({
                        isCompanyExists:true,
                        message:"Company Found!",
                        data:dataRes
                    })

                }
            else
                {
                    response.status(404)
                    response.json({
                        isCompanyExists:false,
                        message:"Company not Found!"
                    })
                }
        }
    else
        {
            response.status(401)
            response.json({
                message:"Permission Denied!"
            })
        }
}

module.exports = {
    createUser: createUser,
    getUserPassword
}