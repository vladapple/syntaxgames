/*
    the fetch_email.js is to fetch data from contact_emails.JSON file using AJAX
*/

// array of key values from Json file
var emailKeys = ["email"];

// function fetches the values from elements of JSON file and places them into table 
// created in this function
function fetchEmails(){
    var xhr = new XMLHttpRequest(); 

    if (xhr) {
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200 ) {
                jsonObj = JSON.parse(xhr.responseText);
                 let string = '<table id ="contact" class="email">'+
                 '<thead><h3 class="green">The list of emails:</h3></thead>'+'<br/>'+
                 '<tr><th>Email Address</th>'+
                 '</tr>'+'<tbody>';
                 let string1 = "";        
  
                for(let j=0; j<jsonObj.length; j++){
                    string1 = string1 + '<tr>';
                    for(let k=0; k<emailKeys.length; k++){
                        string1 = string1 + '<td class="td">'+ jsonObj[j][emailKeys[k]]+'</td>';
                    }
                    string1 = string1 + '</tr>';
                }
                string1 += '</tbody></table>';
                document.getElementById("tableData").innerHTML = string + string1;
                contact.style.color = "white";
                contact.style.border = "1px solid #50C7C7";
            } 
        }; 
       xhr.open('GET', 'data_source/contact_emails.json', true);
       xhr.send();
    }
}