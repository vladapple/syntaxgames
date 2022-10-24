

//adminSubmit function
function adminSubmit() {  
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  
  localStorage.setItem("username", username);  
 }