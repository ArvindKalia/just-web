const mongo = require("mongoose")
const companySchema = require("../model/company.model")
const userSchema = require("../model/user.model")
const studentSchema = require("../model/students.model")
const selectSchema = {
    companySchema: companySchema,
    userSchema: userSchema,
    studentSchema: studentSchema
}


const url = "mongodb+srv://arvindkalia0143:Axis2878cruze@cluster0.bn4tx3g.mongodb.net/just-web"
mongo.connect(url)

const createRecord = async (data, schema) => {
    const schemaSelected = selectSchema[schema]
    const dataRes = await new schemaSelected(data).save()
    return dataRes
}

const getRecordByQuery = async (query, schema) => {
    const currentSchema = selectSchema[schema]
    const companyRes = await currentSchema.find(query)
    return companyRes
}
const updateByQuery = async (query, schema, data) => {
    const currentSchema = selectSchema[schema]
    const dbRes = await currentSchema.updateOne(query, data)
    return dbRes
}
const countData = async (schema) => {
    const currentSchema = selectSchema[schema]
    const dbRes = await currentSchema.countDocuments()
    return dbRes
}
const paginateData = async (from,to,schema) => {
    const currentSchema = selectSchema[schema]
    const dbRes = await currentSchema.find().skip(from).limit(to)
    return dbRes
}

const deleteById=async(id,schema)=>{
    const currentSchema = selectSchema[schema]
    const dbRes = await currentSchema.findByIdAndDelete(id)
    return dbRes
}

module.exports = {
    createRecord,
    getRecordByQuery,
    updateByQuery,
    countData,
    paginateData,
    deleteById
}