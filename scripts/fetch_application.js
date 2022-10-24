/*
    the fetch_application.js is to fetch data from applications.JSON file using AJAX
*/

// array of key values from Json file
var appKeys = ["first_name", "last_name", "email", "phone", "position", "start_date", "status"];

// function fetches the values from elements of JSON file and places them into table 
// created in this function
function fetchApplications(){
    var xhr = new XMLHttpRequest(); 

    if (xhr) {
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200 ) {
                jsonObj = JSON.parse(xhr.responseText);
                 let string = '<table id ="contact" class="app">'+
                 '<thead><h3 class="green">The list of the applicants:</h3></thead>'+'<br/>'+
                 '<tr><th>First Name</th>'+ '<th>Last Name</th>'+
                 '<th>Email</th>'+'<th>Phone</th>'+ '<th>Position</th>'+'<th>Start Date</th>'+
                 '<th>Status</th>'+
                 '</tr>'+'<tbody>';
                 let string1 = "";        
  
                for(let j=0; j<jsonObj.length; j++){
                    string1 = string1 + '<tr>';
                    for(let k=0; k<appKeys.length; k++){
                        string1 = string1 + '<td class="td">'+ jsonObj[j][appKeys[k]]+'</td>';
                    }
                    string1 = string1 + '</tr>';
                }
                string1 += '</tbody></table>';
                document.getElementById("tableData").innerHTML = string + string1;
                contact.style.color = "white";
                contact.style.border = "1px solid #50C7C7";
            } 
        }; 
       xhr.open('GET', 'data_source/applications.json', true);
       xhr.send();
    }
}
