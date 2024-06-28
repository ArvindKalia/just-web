const express=require("express")
const router=express.Router()
const studentController= require("../controller/students.controller")

router.get("/",(request,response)=>{
    response.render("students")
})
router.get("/count-all",(request,response)=>{
    studentController.countData(request,response)
})
router.get("/:from/:to",(request,response)=>{
    studentController.paginate(request,response)
})
router.post("/",(request,response)=>{
    studentController.create(request,response)
})
router.delete("/:id",(request,response)=>{
    studentController.deleteStudent(request,response)
})

module.exports=router