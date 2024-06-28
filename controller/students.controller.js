const tokenService=require("../services/token.service")
const dbService=require("../services/database.service")

const create=async(request,response)=>{
    const tokenData= await tokenService.verifyToken(request)
    if(tokenData.isVerify){
        const data=request.body
        // console.log(data)
        data['companyId']= tokenData.data.uid
        try{

            const dataRes= await dbService.createRecord(data,"studentSchema")
            response.status(200)
            response.json({
                message:"Record Created!",
                data:dataRes
            })
        }
        catch(error){
            response.status(409)
            response.json({
                message:"Record Not Created",
                error:error
            })
        }
    }
    else{
        response.status(401)
        response.json({
            message: "Permission denied"
        })
    }
}

const countData=async(request,response)=>{
    const tokenData= await tokenService.verifyToken(request)
    if(tokenData.isVerify)
        {
            const dataRes= await dbService.countData("studentSchema")
            response.status(200)
            response.json({
                data:dataRes
            })
        }
    else
    {
        response.status(401)
        response.json({
            message:"Permission Denied"
        })
    }


}

const paginate= async(request,response)=>{
    const tokenData= await tokenService.verifyToken(request)
    if(tokenData.isVerify)
        {
            let from= Number(request.params.from)
            let to= Number(request.params.to)
            const dataRes=await dbService.paginateData(from,to,"studentSchema")
            response.status(200)
            response.json({
                data: dataRes
            })
        }
    else{
        response.status(401)
        response.json({
            message:"Permission Denied"
        })
    }
}

const deleteStudent= async(request,response)=>{
    const tokenData= await tokenService.verifyToken(request)
    // console.log(request)
    // console.log(tokenData)
    if(tokenData.isVerify)
        {
            const id=request.params.id
            const dataRes=await dbService.deleteById(id,"studentSchema")
            response.status(200)
            response.json({
                data: dataRes
            })
        }
    else{
        response.status(401)
        response.json({
            message:"Permission Denied1"
        })
    }
}

module.exports={
    create,
    countData,
    paginate,
    deleteStudent
}