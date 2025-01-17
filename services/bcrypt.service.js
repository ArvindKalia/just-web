const bcrypt= require("bcrypt")

const encrypt= async(data)=>{
    const encrypted= await bcrypt.hash(data,12)
    return encrypted
}

const decrypt=async(realPassword,typedPassword)=>{
    const isVerified=bcrypt.compare(typedPassword,realPassword)
    return isVerified
}

module.exports={
    encrypt:encrypt,
    decrypt:decrypt
}