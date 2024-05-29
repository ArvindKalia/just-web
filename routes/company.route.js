const express=require("express")
const router=express.Router()

router.post("/",(request,response)=>{
    response.json({
        message:"Company api requested"
    })
})

module.exports=router;