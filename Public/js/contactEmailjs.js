
const form = document.getElementById("contact-form");

form.addEventListener("handleSubmitForm", function (e) {
  e.preventDefault();
  const issuerelated = document.getElementsByName('flexRadio');
   issuerelated = "";
  for (const radioButton of issuerelated) {
      if (radioButton.checked) {
          issuerelated = radioButton.value;
          break;
      }
  }

  // Get other form field values
  const journalscategory = document.getElementById("form-select-journals").value;
  const subject = document.getElementById("form_subject").value;
  const fullname = document.getElementById("form_fullname").value;
  const email = document.getElementById("form_email").value;
  const message = document.getElementById("form_message").value;

  // Validate form fields
  if (issuerelated === "") {
      alert("Please select your Category!");
      return;
  } else if (journalscategory === "") {
      alert("Please Enter Your journalscategory");
      return;
  } else if (subject === "") {
      alert("Please enter your subject");
      return;
  } else if (fullname === "") {
      alert("Please enter your fullname");
      return;
  } else if (email === "") {
      alert("Please enter your email");
      return;
  } else if (message === "") {
      alert("Please enter your message");
      return;
  }

  // Log form values to console
  console.log(issuerelated, journalscategory, subject, email, fullname, message);

  // Prepare data to be sent via email
  const bodyValues = {
      issuerelated,
      journalscategory,
      subject,
      fullname,
      email,
      message,
  };

  // Call function to send email
  sendEmail(bodyValues);
});

// Function to send email using EmailJS
function sendEmail(bodyValues) {
  const serviceID = "service_44jbxle"; // Your EmailJS service ID
  const tempID = "template_3277mk7"; // Your EmailJS template ID

  // Send email using EmailJS
  emailjs.send(serviceID, tempID, bodyValues)
      .then((res) => {
          console.log("Email sent successfully:", res);
          $(".successErrorMsg").removeClass("d-none alert-danger");
          $(".successErrorMsg").addClass("alert-success");
          $(".successErrorMsg").text("Email sent successfully!");
      })
      .catch((err) => {
          console.error("Email sending error:", err);
          $(".successErrorMsg").removeClass("d-none");
          $(".successErrorMsg").text("Failed to send email. Please try again later.!");
      });
};

