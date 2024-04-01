$("#contactSendMail").on("click", (e) => {
    e.preventDefault();
    const issuerelated = document.getElementById("firstinput").value;
    const journalscategory = document.getElementById("form-select-journals").value;
    const subject = document.getElementById("form_subject").value;
    const fullname = document.getElementById("form_fullname").value;
    const email = document.getElementById("form_email").value;
    const message = document.getElementById("form_message").value;
    
    
    if(issuerelated == null || issuerelated == "") {
    alert("please select your Category!")
      return;
    } else if(journalscategory==null || journalscategory == ""){
      alert("please Enter Your journalscategory")
      return;
    }else if (subject==null || subject==""){
    alert("please enter your subject")
      return;
    }else if (fullname==null || fullname==""){
      alert("please enter your fullname")
      return;  
    }else if (email==null || email==""){
      alert("please enter your email")
      return;   
    }else if (message==null || message==""){
      alert("please enter your message")
      return;
    }
    console.log(issuerelated, journalscategory, subject, email, fullname, message);
    let bodyValues = {
      issuerelated,
      journalscategory,
      subject,
      fullname,
      email,
      message,
    };
    sendEmail(bodyValues);
  });
  
  
  function sendEmail(bodyValues) {
    let serviceID = "service_4kmq1x9";
    let tempID = "template_m3x0ek8";
    emailjs
      .send(serviceID, tempID, bodyValues)
      .then((res) => {
        console.log("Email sent successfully:", res);
        $(".successErrorMsg").removeClass("d-none alert-danger");
        $(".successErrorMsg").addClass("alert-success");
        $(".successErrorMsg").text("Email sent successfully!");
        // alert("Your message sent successfully");
      })
      .catch((err) => {
        console.error("Email sending error:", err);
        $(".successErrorMsg").removeClass("d-none");
        $(".successErrorMsg").text("Failed to send email. Please try again later.!");
        // alert("Failed to send email. Please try again later.");
      });
  }
  