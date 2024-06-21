const mongo=require("mongoose")
const companySchema= require("../model/company.model")
const userSchema= require("../model/user.model")
const selectSchema={
    companySchema:companySchema,
    userSchema:userSchema
}


const url="mongodb://127.0.0.1:27017/test"
mongo.connect(url)

const createRecord=async (data,schema)=>{
    const schemaSelected=selectSchema[schema]
   const dataRes= await new schemaSelected(data).save()
   return dataRes
}

const getRecordByQuery=async(query,schema)=>{
    const currentSchema=selectSchema[schema]
    const companyRes= await currentSchema.find(query)
    return companyRes
}
const updateByQuery=async(query,schema,data)=>{
    const currentSchema=selectSchema[schema]
    const dbRes= await currentSchema.updateOne(query,data)
    return dbRes
}

module.exports={
    createRecord,
    getRecordByQuery,
    updateByQuery
}