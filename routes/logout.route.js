const express=require("express")
const router= express.Router()
const authController=require("../controller/auth.controller")

router.get("/",(request,response)=>{
    // response.json("Logout requested")
    authController.logout(request,response)
})

module.exports=router