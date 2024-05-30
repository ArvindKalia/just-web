const ajax=require("supertest")

const postRequest=(requestData)=>{
    ajax(requestData.endPoint)
    .post(requestData.api)
    .send({token:requestData.data})
    .end((error,dataRes)=>{
        console.log(dataRes.body)
    })
}

module.exports={
    postRequest
}