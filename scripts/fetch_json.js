function getJsonObj(path){
    var xhr = new XMLHttpRequest(); 

    if (xhr) {
       xhr.open('GET', path);

        xhr.onreadystatechange = function() {
           if (xhr.readyState == 4 && xhr.status == 200 ) {
             var jsonObj = JSON.parse(xhr.responseText);
             

           } 
        }; 
       xhr.send();
    }
    return jsonObj;
}