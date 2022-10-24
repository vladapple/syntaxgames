/*
   the contact.js is for validation of the form in contact.html file
   it checks if required fields are correctly entered
*/


// function checks the input, if input is correct, it will not return false
function validateForm() {
    let name = document.forms["frmContact"]["name"].value;
    let email = document.forms["frmContact"]["email"].value;
    let phone = document.forms["frmContact"]["txtPhone"].value;
    let message = document.forms["frmContact"]["txtMessage"].value;

    let emailValid = validateEmail(email);

    if(name == ""){
        document.getElementById("name").style.backgroundColor = "#fc8479";
    }
    if(email == "" || emailValid == false){
        document.getElementById("email").style.backgroundColor = "#fc8479";
    }

    if (name == "" || email == "" || emailValid == false) {
      return false;
    }
  }

  // function validates the entered email address with the pattern
  function validateEmail(email){
    let re = /\S+@\S+\.\S+/;
    return re.test(email);
}

  // function changes background color to "white" when user clicks on input area
  function changeBg(id){
    document.getElementById(id).style.backgroundColor = "white";
  }

  // function validates the Email form
  function validateEmailForm(){
    let email = document.forms["frmEmails"]["txtEmail"].value;
    let emailValid = validateEmail(email);
    if(email == "" || emailValid == false){
        document.getElementById("txtEmail").style.backgroundColor = "#fc8479";
    }
    if (email == "" || emailValid == false) {
        return false;
      }
  }


 
  



    
