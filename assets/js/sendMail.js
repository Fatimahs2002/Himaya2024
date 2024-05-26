(function () {
     emailjs.init("KFH_qIBQFYmTgXbBY");
   })();

   function sendMail() {
     var name = document.getElementById("name").value;
     var email = document.getElementById("email").value;
     var subject = document.getElementById("subject").value;
     var message = document.getElementById("message").value;

     // Validate that all fields are not empty
     if (name && email && subject && message) {
       var params = {
         name: name,
         email: email,
         subject: subject,
         message: message,
       };

       const serviceID = "service_8n1so6n";
       const templateID1 = "template_irco4qm"; // First template ID
       const templateID2 = "template_86xhtvw"; // Second template ID
       // Show spinner
       document.getElementById("spinner").style.display = "block";
       document.getElementById("msg").style.display = "none";

       // Send email to the first recipient using the first template
       emailjs
         .send(serviceID, templateID1, params)
         .then((res) => {
           console.log("Email sent to first recipient:", res);

           // Send email to the second recipient using the second template
           return emailjs.send(serviceID, templateID2, params);
         })
         .then((res) => {
           console.log("Email sent to second recipient:", res);

           // Clear form fields
           document.getElementById("name").value = "";
           document.getElementById("email").value = "";
           document.getElementById("subject").value = "";
           document.getElementById("message").value = "";

           // Show success message and hide spinner
           document.getElementById("msg").style.display = "block";
           document.getElementById("spinner").style.display = "none";
         })
         .catch((err) => {
           console.log(err);
           alert("Failed to send email. Please try again.");
           // Hide spinner
           document.getElementById("spinner").style.display = "none";
         });
     } else {
       alert("Please fill in all fields.");
     }
   }