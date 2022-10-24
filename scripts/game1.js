// Release Countdown

var countDownDate = new Date("May 19, 2022 0:00:00").getTime();
var myfunc = setInterval(function() {

var now = new Date().getTime();
var timeleft = countDownDate - now;
var days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
var hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
var seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

document.getElementById("countdown").innerHTML = 
days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
        
if (timeleft < 0) {
  clearInterval(myfunc);
  document.getElementById("countdown").innerHTML = "";
  document.getElementById("end").innerHTML = "Game Released!";
  }
}, 1000);

// Music Player

const musicContainer = document.querySelector(".music-container");
const playBtn = document.querySelector("#play");
const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");
const audio = document.querySelector("#audio");
const progress = document.querySelector(".progress");
const progressContainer = document.querySelector(".progress-container");
const title = document.querySelector("#title");
const cover = document.querySelector("#cover");

var slider = document.getElementById("myRange");
var output = document.getElementById("volumeNum");
var volume = document.getElementById("audio");

// Song Titles

const songs = ["test1", "test2", "test3"];

//keep track of songs
let songIndex = 0;

//Initially load song info
loadSong(songs[songIndex]);

// Update song details
function loadSong(song) {
  title.innerText = song;
  audio.src = `../Music_Player_Smaller/sounds/${song}.mp3`;
  cover.src = `../images/${song}.jpg`;
}

function playSong() {
  musicContainer.classList.add("play");
  playBtn.querySelector("i.fas").classList.remove("fa-play");
  playBtn.querySelector("i.fas").classList.add("fa-pause");

  audio.play();
}

function pauseSong() {
  musicContainer.classList.remove("play");
  playBtn.querySelector("i.fas").classList.add("fa-play");
  playBtn.querySelector("i.fas").classList.remove("fa-pause");

  audio.pause();
}

function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);
  playSong();
}

function nextSong() {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);
  playSong();
}

function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

slider.oninput = function () {
  output.innerHTML = slider.value;
};

//Event listeners
playBtn.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

slider.addEventListener("input", (e) => {
  const value = e.target.value;

  audio.volume = value / 50;
});

output.innerHTML = slider.value;

// Change song events
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

audio.addEventListener("timeupdate", updateProgress);

progressContainer.addEventListener("click", setProgress);

audio.addEventListener("ended", nextSong);

/* Piano */

function hidePiano() {
  var x = document.getElementById("piano");
  if (x.style.display == "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

const keys = document.querySelectorAll(".key"),
  note = document.querySelector(".nowplaying"),
  hints = document.querySelectorAll(".hints");

function playNote(e) {
  var x = document.getElementById("piano");
  if (x.style.display == "none") {
    return;
  } else {
    const audio = document.querySelector(`audio[data-key="${e.key}"]`),
      key = document.querySelector(`.key[data-key="${e.key}"]`);

    if (!key) return;

    const keyNote = key.getAttribute("data-note");

    key.classList.add("playing");
    note.innerHTML = keyNote;
    audio.currentTime = 0;
    audio.play();
  }
}

function removeTransition(e) {
  if (e.propertyName !== "transform") return;
  this.classList.remove("playing");
}

function hintsOn(e, index) {
  e.setAttribute("style", "transition-delay:" + index * 50 + "ms");
}

hints.forEach(hintsOn);

keys.forEach(key => key.addEventListener("transitionend", removeTransition));

window.addEventListener("keydown", playNote);

/* 2048 */

/* Disable arrow scrolling on webpage */

window.addEventListener("keydown", function(e) {
  if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
      e.preventDefault();
  }
}, false);

var size = 4;
var htmlElements;
var cells;

function createField() {
  if (htmlElements) {
    return;
  }

  htmlElements = [];
  var table = document.getElementById('field');
  for (var y = 0; y < size; y++) {
    var tr = document.createElement('tr');
    var trElements = [];
    for (var x = 0; x < size; x++) {
      var td = document.createElement('td');
      td.setAttribute('class', 'cell');
      tr.appendChild(td);
      trElements.push(td);
    }
    htmlElements.push(trElements);
    table.appendChild(tr);
  }
}

function createCells() {
  cells = [];
  for (var y = 0; y < size; y++) {
    cells.push(new Array(size).fill(0));
  }
}

function generateInEmptyCell() {
  var x, y;
  do {
    x = Math.floor(Math.random() * size), y = Math.floor(Math.random() * size);
    if (cells[y][x] == 0) {
      cells[y][x] = Math.random() >= 0.8 ? 4 : 2;
      break;
    }
  } while (true);
}

function draw() {
  for (var y = 0; y < size; y++) {
    for (var x = 0; x < size; x++) {
      var td = htmlElements[y][x];
      var v = cells[y][x];
      td.innerHTML = v == 0 ? '' : String(v);
      if (v == 0) {
        td.setAttribute('style', 'background-color: grey');
      } else {
        var h = 20 + 24 * Math.log2(2048 / v);
        td.setAttribute('style', 'background-color: hsl(' + h + ', 40%, 30%)');
      }
    }
  }
}

function slide(array, size) {
  // [0, 2, 2, 2] => [2, 2, 2] => [4, 0, 2] => [4, 2] => [4, 2, 0, 0]
  function filterEmpty(a) {
    return a.filter(x => x != 0);
  }

  array = filterEmpty(array);
  if (array.length > 0) {
    for (var i = 0; i < array.length - 1; i++) {
      if (array[i] == array[i + 1]) {
        array[i] *= 2;
        array[i + 1] = 0;
      }
    }
  }
  array = filterEmpty(array);
  while (array.length < size) {
    array.push(0);
  }
  return array;
}

function slideLeft() {
  var changed = false;
  for (var y = 0; y < size; y++) {
    var old = Array.from(cells[y]);
    cells[y] = slide(cells[y], size);
    changed = changed || (cells[y].join(',') != old.join(','));
  }
  return changed;
}

function swap(x1, y1, x2, y2) {
  var tmp = cells[y1][x1];
  cells[y1][x1] = cells[y2][x2];
  cells[y2][x2] = tmp;
}

function mirror() {
  for (var y = 0; y < size; y++) {
    for (var xLeft = 0, xRight = size - 1; xLeft < xRight; xLeft++, xRight--) {
      swap(xLeft, y, xRight, y);
    }
  }
}

function transpose() {
  for (var y = 0; y < size; y++) {
    for (var x = 0; x < y; x++) {
      swap(x, y, y, x);
    }
  }
}

function moveLeft() {
  return slideLeft();
}

function moveRight() {
  mirror();
  var changed = moveLeft();
  mirror();
  return changed;
}

function moveUp() {
  transpose();
  var changed = moveLeft();
  transpose();
  return changed;
}

function moveDown() {
  transpose();
  var changed = moveRight();
  transpose();
  return changed;
}

// Swipe Functions

function swipedetect(el, callback){
  
  var touchsurface = el,
  swipedir,
  startX,
  startY,
  distX,
  distY,
  threshold = 30, //required min distance traveled to be considered swipe
  restraint = 100, // maximum distance allowed at the same time in perpendicular direction
  allowedTime = 300, // maximum time allowed to travel that distance
  elapsedTime,
  startTime,
  handleswipe = callback || function(swipedir){}

  touchsurface.addEventListener('touchstart', function(e){
      var touchobj = e.changedTouches[0]
      swipedir = 'none'
      dist = 0
      startX = touchobj.pageX
      startY = touchobj.pageY
      startTime = new Date().getTime() // record time when finger first makes contact with surface
      e.preventDefault()
  }, false)

  touchsurface.addEventListener('touchmove', function(e){
      e.preventDefault() // prevent scrolling when inside DIV
  }, false)

  touchsurface.addEventListener('touchend', function(e){
      var touchobj = e.changedTouches[0]
      distX = touchobj.pageX - startX // get horizontal dist traveled by finger while in contact with surface
      distY = touchobj.pageY - startY // get vertical dist traveled by finger while in contact with surface
      elapsedTime = new Date().getTime() - startTime // get time elapsed
      if (elapsedTime <= allowedTime){ // first condition for awipe met
          if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){ // 2nd condition for horizontal swipe met
              swipedir = (distX < 0)? 'left' : 'right' // if dist traveled is negative, it indicates left swipe
          }
          else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint){ // 2nd condition for vertical swipe met
              swipedir = (distY < 0)? 'up' : 'down' // if dist traveled is negative, it indicates up swipe
          }
      }
      handleswipe(swipedir)
      e.preventDefault()
  }, false)
}

window.addEventListener('load', function(){
  var el = document.getElementById('field')
  swipedetect(el, function(swipedir){
    var code = swipedir;
  var ok;
  switch (code) {
    case 'down': ok = moveDown(); break;
    case 'up': ok = moveUp(); break;
    case 'left': ok = moveLeft(); break;
    case 'right': ok = moveRight(); break;
    default: return;
  }
  if (ok) {
    generateInEmptyCell();
    draw();
  }
  if (isGameOver()) {
    setTimeout(function() {
      alert('Game over');
      init();
    }, 1000);
  }

  })
}, false)

function isGameOver() {
  for (var y = 0; y < size; y++) {
    for (var x = 0; x < size; x++) {
      if (cells[y][x] == 0) {
        return false;
      }
    }
  }
  for (var y = 0; y < size - 1; y++) {
    for (var x = 0; x < size - 1; x++) {
      var c = cells[y][x];
      if (c != 0 && (c == cells[y + 1][x] || c == cells[y][x + 1])) {
        return false;
      }
    }
  }
  return true;
 }

document.addEventListener('keydown', function(e) {
  var code = e.key;
  var ok;
  switch (code) {
    case 'ArrowDown': ok = moveDown(); break;
    case 'ArrowUp': ok = moveUp(); break;
    case 'ArrowLeft': ok = moveLeft(); break;
    case 'ArrowRight': ok = moveRight(); break;
    default: return;
  }
  if (ok) {
    generateInEmptyCell();
    draw();
  }
  if (isGameOver()) {
    setTimeout(function() {
      alert('Game over');
      init();
    }, 1000);
  }
});

function init() {
  createField();
  createCells();
  new Array(3).fill(0).forEach(generateInEmptyCell);
  draw();
}

init();