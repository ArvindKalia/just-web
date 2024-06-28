// alert("Students")
//get country phone code
$(document).ready(() => {
    $(".country").on("input", async (e) => {
        let keyword = $(e.target).val().trim().toLowerCase()
        const localData = checkInLs("countryCode")
        if (localData.isExists) {
            const countries = localData.data;
            for (let country of countries) {
                if (country.name.toLowerCase().indexOf(keyword) != -1) {
                    const dial_code = country.dial_code
                    $(".code").html(dial_code)
                }
            }
        }
        else {
            const request = {
                type: "GET",
                url: "../json/country-code.json"
            }
            const response = await ajax(request)
            // console.log(response)
            localStorage.setItem("countryCode", JSON.stringify(response))
        }
    })
})

//add students
$(document).ready(() => {
    $("#student-form").submit(async (e) => {
        e.preventDefault()
        const token = getCookie("authToken")
        let formData = new FormData(e.target)
        formData.append("token", token)
        const request = {
            type: "POST",
            url: "/students",
            data: formData,
            isLoader: true,
            commonBtn: ".add-student-btn",
            loaderBtn: ".student-loader-btn"
        }
        try {
            
            const dataRes=await ajax(request)
            console.log(dataRes)
            const student=dataRes.data
            const tr=dynamicTr(student)
            $(".students-list").append(tr)
            $("#student-modal").modal("hide")
            studentAction()
        }
        catch (error) {
            $(".student-email").addClass("animate__animated animate__shakeX border border-danger")
            $(".student-email").click(function () {
                $(this).removeClass("animate__animated animate__shakeX border border-danger")
                $(this).val("")
            })

        }
    })
})

//show students
$(document).ready(async () => {
    let from = 0
    let to = 5
    showStudents(from, to)

})

const showStudents = async (from, to) => {
    const request = {
        type: "GET",
        url: `/students/${from}/${to}`,
        isLoader:true,
        commonBtn:".tmp",
        loaderBtn:".students-skeleton"
    }
    const response = await ajax(request)
    if (response.data.length > 0) {
        const data = response.data
        for (let student of data) {
            // console.log(student)
            let tr= dynamicTr(student)
             
            $(".students-list").append(tr)
        }
        studentAction()
    }
    else {
        swal("No Student Data Found", "Add Students to Continue", "warning")
    }
}

const dynamicTr=(student)=>{
    const studentString=JSON.stringify(student)
    const studentData=studentString.replace(/"/g,"'")
    let tr=`
                    <tr class="animate__animated animate__fadeIn animate__slower">
                    <td class="text-nowrap">
                        <div class="d-flex align-items-center">
                        <i class="fa fa-user-circle mx-3" style="font-size:45px"></i>
                        <div>
                        <p class="p-0 m-0 text-capitalize">${student.studentName}</p>
                        <small class="text-uppercase">${student.studentCountry}</small>
                        </div>
                        </div>
                    </td>
                    <td class="text-nowrap">${student.studentEmail}</td>
                    <td class="text-nowrap">${student.studentMobile}</td>
                    <td class="text-nowrap">${student.studentFather}</td>
                    <td class="text-nowrap">${student.studentDob}</td>
                    <td class="text-nowrap">${student.studentCountry}</td>
                    <td class="text-nowrap">${student.studentState}</td>
                    <td class="text-nowrap">${student.studentPincode}</td>
                    <td class="text-nowrap">${student.studentAddress}</td>
                    <td class="text-nowrap">
                        <span class="badge badge-danger">Pending</span>
                    </td>
                    <td class="text-nowrap">${student.updatedAt}</td>
                    <td class="text-nowrap">
                        <div class="d-flex">
                        <button data-student="${studentData}" data-id="${student._id}" class="edit-student icon-btn-primary">
                        <i class="fa fa-edit"></i>
                        </button>
                        <button data-id="${student._id}" class="delete-student icon-btn-danger mx-2">
                        <i class="fa fa-trash"></i>
                        </button>
                        <button data-id="${student._id}" class="share-student icon-btn-info">
                        <i class="fa fa-share"></i>
                        </button>
                        </div>
                    </td>
                    </tr>
                   `
    return tr
}

const studentAction=()=>{
    //Delete action
    $(document).ready(()=>{
        $(".delete-student").each(function(){
            $(this).click( async function(){
                const tr= this.parentElement.parentElement.parentElement
                const id= $(this).data("id")
                const token=getCookie("authToken")
                const request={
                    type:"DELETE",
                    url:"/students/"+id,
                    data:{
                        token:token
                    }
                }
                const isConfirm= await confirm("Deleted")
                if(isConfirm){

                    await ajax(request)
                    tr.remove()
                }
                
                // console.log(response)
            })
        })
    })

    //edit action
    $(document).ready(()=>{
        $(".edit-student").each(function(){
            $(this).click(function(){
                const id=$(this).data("id")
                const studentString=$(this).data("student")
                // console.log(studentString)
                const studentData=studentString.replace(/'/g,'"')
                const student=JSON.parse(studentData)
                
                for(let key in student){
                    let value=student[key]
                $(`[name=${key}]`).val(value)
                }
                $("#student-modal").modal("show")
            })
        })
    })
}

const checkInLs = (key) => {
    if (localStorage.getItem(key) != null) {
        let tmp = JSON.parse(localStorage.getItem(key))
        return {
            isExists: true,
            data: tmp
        }
    }
    else {
        return {
            isExists: false
        }
    }
}

const ajax = (request) => {
    return new Promise((resolve, reject) => {
        const options= {
            type: request.type,
            url: request.url,
            beforeSend: () => {
                if (request.isLoader) {
                    $(request.commonBtn).addClass("d-none")
                    $(request.loaderBtn).removeClass("d-none")
                }
            },
            complete: () => {
                if (request.isLoader) {
                    $(request.commonBtn).removeClass("d-none")
                    $(request.loaderBtn).addClass("d-none")
                }
            },
            success: (response) => {
                resolve(response)
            },
            error: (error) => {
                reject(error)
            }

        }
        if(request.type=="POST" || request.type=="PUT")
            {
                options['data']=request.data;
                options['processData']=false;
                options['contentType']=false;

            }
        if(request.type=="DELETE")
            {
                options['data']=request.data;

            }
        $.ajax(options)
    })
}

const getCookie = (cookieName) => {
    const allCookie = document.cookie
    let cookies = allCookie.split(";")
    let cookieValue = ""
    for (let cookie of cookies) {
        let currentCookie = cookie.split("=")
        if (currentCookie[0].trim() == cookieName) {
            cookieValue = currentCookie[1]
        }
    }
    return cookieValue
}

const confirm=(message)=>{
    return new Promise((resolve,reject)=>{
        swal({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            buttons: true,
            dangerMode:true
          }).then((willDelete) => {
            if (willDelete) {
                resolve(true)
              swal({
                title: "Deleted!",
                text: `Your file has been deleted${message}.`,
                icon: "success"
              });
            }else{
                reject(false)
                swal("Your file is safe")
            }
          });
    })
 
   
}