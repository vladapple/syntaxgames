function countdownGame2() {
    const RELEASE_DATE = new Date("May 18, 2022 23:00:00").getTime();
    var currentTime = new Date().getTime();
    var difference = RELEASE_DATE - currentTime;

    // using modulus to convert milliseconds to variables
    var day = Math.floor(difference / (1000 * 60 * 60 * 24));
    var hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((difference % (1000 * 60)) / 1000);

    document.getElementById('countdownRelease').innerHTML = `${day} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds!`;
}


window.addEventListener('load', setInterval(countdownGame2, 1000));