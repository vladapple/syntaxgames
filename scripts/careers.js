/*
   the carrers.js is for validation of the form in careers.html file
   it checks if required fields are correctly entered
*/

// function validates all required fields, if fields are not entered or entered not correctly
function validateCareersForm() {
    let firstname = document.forms["frmCareers"]["firstName"].value;
    let lastname = document.forms["frmCareers"]["lastName"].value;
    let email = document.forms["frmCareers"]["txtEmail"].value;
    let emailValid = validateEmail(email);
    let job = document.forms["frmCareers"]["job"].value;

    if(firstname == ""){
        document.getElementById("firstName").style.backgroundColor = "#fc8479";
    }
    if(lastname == ""){
        document.getElementById("lastName").style.backgroundColor = "#fc8479";
    }
    if(email == "" || emailValid == false){
        document.getElementById("txtEmail").style.backgroundColor = "#fc8479";
    }

    if(job == "NotChosen"){
        document.getElementById("job").style.backgroundColor = "#fc8479";
    }

    if (firstname == "" || lastname == "" || email == "" || emailValid == false || job == "NotChosen") {
      return false;
    }
  }

  // function changes background color to "white" when user clicks on input area
  function changeBg(id){
    document.getElementById(id).style.backgroundColor = "white";
  }
  
  // function validates the entered email address with the pattern
  function validateEmail(email){
        let re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

  