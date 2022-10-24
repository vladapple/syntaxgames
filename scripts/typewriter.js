var i = 0;
var txt = "We are Syntax Games"; /* The text */
var speed = 120; /* The speed/duration of the effect in milliseconds */

function typeWriter() {
  if (document.documentElement.lang == "en") {
    if (i < txt.length) {
      document.getElementById("typewriter-message").innerHTML += txt.charAt(i);
      i++;
      setTimeout(typeWriter, speed);
    }
  }else{
    txt = "Nous sommes Syntax Games"; /* The text */
    if (i < txt.length) {
      document.getElementById("typewriter-message").innerHTML += txt.charAt(i);
      i++;
      setTimeout(typeWriter, speed);
    }
  }
}

window.addEventListener("load", typeWriter);
