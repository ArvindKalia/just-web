const tokenService = require("../services/token.service")
const dbService = require("../services/database.service")
const createCompany = async (request, response) => {
    const token = await tokenService.verifyToken(request)
    // console.log(token.data)
    if (token) {
        const data = token.data

        try {
            const dataRes = await dbService.createRecord(data,"companySchema")
            response.status(200)
            response.json({
                isCompanyCreated: true,
                message: "Company Created",
                data: dataRes
            })
        }
        catch (error) {
            response.status(409)
            response.json({
                isCompanyCreated: false,
                message: error
            })
        }
    }
    else {
        response.status(401)
        response.json({
            message: "Permission denied"
        })
    }
}

const getCompanyId=async(request,response)=>{
    const token=await tokenService.verifyToken(request)
    // console.log(token)
    if(token.isVerify)
        {
            const query={
                email:token.data.email
            }
            const companyRes= await dbService.getRecordByQuery(query,"companySchema")
            if(companyRes.length>0){
                // console.log(companyRes)
                response.status(200)
                response.json({
                    isCompanyExists:true,
                    message:"Company Found!",
                    data:companyRes
                })
            }
            else{
                response.status(404)
                response.json({
                    isCompanyExists:false,
                    message:"Company not Found!"
                })
            }
        }
    else{
        response.status(401)
        response.json({
            message:"Permission Denied !"
        });
    }
}

module.exports = {
    createCompany,
    getCompanyId
}