const ajax=require("supertest")

const postRequest= async(requestData)=>{
    const response = await ajax(requestData.endPoint)
    .post(requestData.api)
    .send({token:requestData.data})
    return response.body
}
const getRequest= async(requestData)=>{
    const response = await ajax(requestData.endPoint)
    .get(requestData.api+"/"+requestData.data)
    .set({'X-Auth-Token':requestData.data})
    return response.body
}
const putRequest= async(requestData)=>{
    const response = await ajax(requestData.endPoint)
    .put(requestData.api+"/"+requestData.data)
    .send({token:requestData.data})
    return response.body
}

module.exports={
    postRequest,
    getRequest,
    putRequest
}