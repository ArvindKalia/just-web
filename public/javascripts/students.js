// alert("Students")
$(document).ready(()=>{
    $(".country").on("input",async(e)=>{
        let keyword= $(e.target).val().trim().toLowerCase()
        const localData=checkInLs("countryCode")
        if(localData.isExists){
            const countries=localData.data;
            for(let country of countries)
                {
                    if(country.name.toLowerCase().indexOf(keyword)!=-1)
                        {
                            const dial_code= country.dial_code
                            $(".code").html(dial_code)
                        }
                }
        }
        else{
            const request={
                type:"GET",
                url:"../json/country-code.json"
            }
            const response= await ajax(request)
            // console.log(response)
            localStorage.setItem("countryCode",JSON.stringify(response))
        }
    })
})

const checkInLs=(key)=>{
    if(localStorage.getItem(key)!=null)
        {
            let tmp= JSON.parse(localStorage.getItem(key))
            return {
                isExists: true,
                data:tmp
            }
        }
        else{
            return {
                isExists: false
            }
        }
}

const ajax=(request)=>{
   return new Promise((resolve,reject)=>{
    $.ajax({
        type:request.type,
        url:request.url,
        success:(response)=>{
            resolve(response)
        },
        error:(error)=>{
            reject(error)
        }

    })
   })
}