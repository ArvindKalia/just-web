$(document).ready(()=>{
    $("#login-modal-request").click((e)=>{
        e.preventDefault();
        $("#signup-modal").modal("hide")
        $("#login-modal").modal("show")
    })
})
$(document).ready(()=>{
    $("#signup-modal-request").click((e)=>{
        e.preventDefault();
        $("#login-modal").modal("hide")
        $("#signup-modal").modal("show")
    })
})

$(document).ready(()=>{
    $("#signup-form").submit((e)=>{
        e.preventDefault();
        $.ajax({
            type:"POST",
            url:"api/signup",
            // data:{
            //     company:$("[name='company']").val(),
            //     email:$("[name='email']").val(),
            //     mobile:$("[name='mobile']").val(),
            //     password:$("[name='password']").val()
            // },
            data:new FormData(e.target),
            contentType:false,
            processData:false,
            success:(response)=>{
                console.log(response)
            },
            error:(error)=>{
                console.log(error)
            }
        })
    })
})