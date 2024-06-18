$(document).ready(() => {
  $("#login-modal-request").click((e) => {
    e.preventDefault();
    $("#signup-modal").modal("hide");
    $("#login-modal").modal("show");
  });
});
$(document).ready(() => {
  $("#signup-modal-request").click((e) => {
    e.preventDefault();
    $("#login-modal").modal("hide");
    $("#signup-modal").modal("show");
  });
});

//signup request
$(document).ready(() => {
  $("#signup-form").submit((e) => {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "api/signup",
      // data:{
      //     company:$("[name='company']").val(),
      //     email:$("[name='email']").val(),
      //     mobile:$("[name='mobile']").val(),
      //     password:$("[name='password']").val()
      // },
      data: new FormData(e.target),
      contentType: false,
      processData: false,
      beforeSend: () => {
        $(".before-send").removeClass("d-none");
        $(".signup-btn").addClass("d-none");
      },
      success: (response) => {
        // console.log(response)
        if (response.isCompanyCreated) {
          //redirect to login page
        } else {
          const label = response.message.label;
          const field = "." + response.message.field;
          $(field).addClass("border border-danger");
          $(field + "-error").html(label);

          setTimeout(() => {
            resetValidator(field);
          }, 3000);
        }
      },
      complete: () => {
        $(".before-send").addClass("d-none");
        $(".signup-btn").removeClass("d-none");
      },
      error: (error) => {
        console.log(error);
      },
    });
  });
});

//login request
$(document).ready(() => {
  $("#login-form").submit((e) => {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "api/login",
      // data:{
      //     company:$("[name='company']").val(),
      //     email:$("[name='email']").val(),
      //     mobile:$("[name='mobile']").val(),
      //     password:$("[name='password']").val()
      // },
      data: new FormData(e.target),
      contentType: false,
      processData: false,
      beforeSend: () => {
        $(".before-send").removeClass("d-none");
        $(".login-btn").addClass("d-none");
      },
      success: (response) => {
        // console.log(response)
        if (response.isLogged) {
          window.location = "/profile";
        }
      },
      complete: () => {
        $(".before-send").addClass("d-none");
        $(".login-btn").removeClass("d-none");
      },
      error: (error) => {
        // console.log(error)
        if (error.status == 404) {
          const field = ".username";
          $(".username").addClass("border border-danger");
          $(".username-error").html("User Not Found !");
          setTimeout(() => {
            resetValidator(field);
          }, 3000);
        } else if(error.status == 401) {
          const field = ".password";
          $(".password").addClass("border border-danger");
          $(".password-error").html("Password Incorrect !");
          setTimeout(() => {
            resetValidator(field);
          }, 3000);
        }
        else
        {
            swal(error.status,"Internal Server Error !","warning")
        }
      },
    });
  });
});

const resetValidator = (field) => {
  $(field).removeClass("border-danger");
  $(field + "-error").html(" ");
};
