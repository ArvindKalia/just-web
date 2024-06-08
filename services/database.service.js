const mongo=require("mongoose")
const companySchema= require("../model/company.model")

const url="mongodb://127.0.0.1:27017/test"
mongo.connect(url)

const createRecord=async (data)=>{
   const dataRes= await new companySchema(data).save()
   return dataRes
}

module.exports={
    createRecord
}