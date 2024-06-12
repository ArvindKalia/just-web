const ajax=require("supertest")

const postRequest= async(requestData)=>{
    const response = await ajax(requestData.endPoint)
    .post(requestData.api)
    .send({token:requestData.data})
    return response.body
}
const getRequest= async(requestData)=>{
    const response = await ajax(requestData.endPoint)
    .post(requestData.api+"/"+requestData.data)
    return response.body
}

module.exports={
    postRequest,
    getRequest
}