/*
    the fetch_contact.js is to fetch data from contact.JSON file using AJAX
*/

// array of key values from Json file
var contactKeys = ["name", "email", "phone", "message"];

// function fetches the values from elements of JSON file and places them into table 
// created in this function
function fetchContacts(){

    var xhr = new XMLHttpRequest(); 

    if (xhr) {
        xhr.onreadystatechange = function() {
           if (xhr.readyState == 4 && xhr.status == 200 ) {
              jsonObj = JSON.parse(xhr.responseText);
               let string = '<table id ="contact">'+
               '<thead><h3 class="green">The list of contacted persons:</h3></thead>'+'<br/>'+
               '<tr><th>Name</th>'+
               '<th>Email</th>'+
               '<th>Phone</th>'+
               '<th>Message</th>'+
               '</tr>'+'<tbody>';
               let string1 = "";        

              for(let j=0; j<jsonObj.length; j++){
                  string1 = string1 + '<tr>';
                  for(let k=0; k<contactKeys.length; k++){
                      string1 = string1 + '<td class="td">'+ jsonObj[j][contactKeys[k]]+'</td>';
                  }
                  string1 = string1 + '</tr>';
              }
              string1 += '</tbody></table>';
              document.getElementById("tableData").innerHTML = string + string1;
              contact.style.color = "white";
              contact.style.border = "1px solid #50C7C7";
           } 
        }; 
       xhr.open('GET', 'data_source/contact.json', true);
       xhr.send();
    }
}
