const mongo=require("mongoose")
const {Schema}=mongo

const companySchema=new Schema({
    company:{
        type:String,
        unique:true
    },
    email:{
        type:String,
        unique:true
    },
    mobile:Number,
    emailVerified:{
        type:Boolean,
        default: false
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

//company name unique validation

companySchema.pre("save",async function(next){
    const query={
        company:this.company
    }
    const length= await mongo.model("company").countDocuments(query)
    if(length>0){
        const cmpError={
            label:"Company Name Already Exist",
            field:"company-name"
        }
       throw next(cmpError)
    }
    else{
        next()
    }
})

//email unique validation

companySchema.pre("save",async function(next){
    const query={
        email:this.email
    }
    const length= await mongo.model("company").countDocuments(query)
    if(length>0){
        const emailError={
            label:"Company Email Already Exist",
            field:"company-email"
        }
       throw next(emailError)
    }
    else{
        next()
    }
})

module.exports=mongo.model("company",companySchema)