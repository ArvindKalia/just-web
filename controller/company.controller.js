const tokenService=require("../services/token.service")
const dbService=require("../services/database.service")
const createCompany=async(request,response)=>{
    const token= await tokenService.verifyToken(request)
    // console.log(token.data)
    if(token)
        {   
            const data=token.data

            try{
                const dataRes= await dbService.createRecord(data)
                console.log(dataRes)
            }
            catch(error){
                console.log(error)
            }
        }
        else{
            response.status(401)
            response.json({
                message:"Permission denied"
            })
        }
}

module.exports={
    createCompany
}