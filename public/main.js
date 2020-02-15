$( document ).ready(function() {
  let oldValue = $("#shortcode").value;
  const baseUrl = window.location.href

    $("#url-shortner").submit(function(){
        event.preventDefault();
        const url =document.getElementById('url').value;
        const data = {
            "longUrl":url
        }
      fetch(`${baseUrl}api/url/shorten`, {
            method: 'POST', 
           
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers:{
              'Content-Type': 'application/json'
            }
          }).then(res => res.json())
          .then(response => {console.log('Success:', JSON.stringify(response))
                             $("#shorturl").val(response.shortUrl)
        
        })
          .catch(error => console.error('Error:', error));
    })
    $("#random").click(function(){
      var thisCheck = $(this);
     

      if (thisCheck.is (':checked')){
        
      }
      else {
        if($("#shortcode").value){
          $("#shortcode").val($("#shortcode").value)
        }
        else {
           $("#shortcode").val(oldValue)
        }
      }
          

    })
   /* $("#shortcode").keyup(function(){
       oldValue = $("#shortcode").value;
       const data = {
        "urlCode":oldValue
       }
       console.log(oldValue)
       fetch("http://localhost:5000/api/url/checkcode", {
            method: 'POST', 
           
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers:{
              'Content-Type': 'application/json'
            }
          }).then(res => res.json())
          .then(response => {console.log('Success:', JSON.stringify(response))
                              if(response.success){
                                $("#error").text("code is available")
                              }
                              else{
                                $("#error").text("code is not available")
                              }
                             
        
        })
          .catch(error => console.error('Error:', error));

    })*/
});