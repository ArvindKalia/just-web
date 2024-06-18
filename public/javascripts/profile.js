$(document).ready(()=>{
    $(".toggler").click(()=>{
    let state= $(".sidenav").hasClass("sidenav-open")
    if(state)
        {
            //control sidenav
            $(".sidenav").removeClass("sidenav-open")
            $(".sidenav").addClass("sidenav-close")
            
            //control section
            $(".section").removeClass("section-open")
            $(".section").addClass("section-close")
        } 
        else
        {
             //control sidenav
             $(".sidenav").addClass("sidenav-open")
             $(".sidenav").removeClass("sidenav-close")
             
             //control section
             $(".section").addClass("section-open")
             $(".section").removeClass("section-close")
        }

    })
})