/*
    chat_bot.js   file controls the two sections 1.the form section and 2. chat section
    in the chat section it implements the input processing simulating chat with chat-bot.
 */



function chatBot(){
    document.getElementById("disappear").style.display = "none";
    document.getElementById("appear").style.display = "block";
}

function chatBotEnd(){
    document.getElementById("disappear").style.display = "block";
    document.getElementById("appear").style.display = "none";
}


var i = 0;            
let guestText = [];
//array of agent's phrases
let agent = ["Hi! How are you?", 
"I am fine! Thank you! How can I help you today?", 
"We have the piano game here. You can try!", 
"Anything else I can help you?",
"Have a good day! Good bye!"];
let string = "";
      
const addText = (ev) => {
    ev.preventDefault();    // to stop the form submitting
    let phrase = {
        guest: document.getElementById("chat").value + "<br/>",
        agent: "<i><b>" + agent[i] + "</b></i><br/>" // insert agents phrases by index i
    }
    i++; 
    
    // add element to guestText array.
    guestText.push(phrase);
    document.forms["formChat"].reset();  // clean the input

    let chatArea = document.getElementById("chatarea");
    string = JSON.stringify(guestText);  // convert guestText array into string

    //filter the string from } , { : "  to make it look like real phrase
    string = string.substring(2, string.length-2); 
    string = string.replace(/},{/g, "<br/>");
    string = string.replace(/:/g, ": ");
    string = string.replace(/"/g, "");
    string = string.replace(/,/g, "");

    // place string into html tag target
    chatArea.innerHTML = string;
 
}
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('sendToChat').addEventListener('click', addText); 
})

