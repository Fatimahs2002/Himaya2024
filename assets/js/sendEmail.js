function sendMail() {
     var params = {
       name: document.getElementById("name").value,
       email: document.getElementById("email").value,
       subject:document.getElementById("subject").value,
       message: document.getElementById("message").value,

     };
   
     const serviceID = "service_apujjbo";
     const templateID = "template_av3888f";
   
       emailjs.send(serviceID, templateID, params)
       .then(res=>{
           document.getElementById("name").value = "";
           document.getElementById("email").value = "";
           document.getElementById("subject").value = "";
           document.getElementById("message").value = "";
       
           console.log(res);
           alert("Your message sent successfully!!");
           document.getElementById("msg").style.display="block";
   
       })
       .catch(err=>console.log(err));
   
   }