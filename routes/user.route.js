const express= require("express")
const router= express.Router()
const userController=require("../controller/user.controller")

router.post("/",(request,response)=>{
    userController.createUser(request,response)
})

module.exports=router;