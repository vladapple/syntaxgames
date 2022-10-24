// *EVENT CALENDAR*

// Events
const event1 = {17:"test"}; 

// "cal" object gets created on page load
var cal = {

    // Calendar
    sMon : false, // Week start on Monday?
    mName : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], // Month Names
  
    // Calendar Data
    data : null, // Events for the selected period
    sDay : 0, sMth : 0, sYear : 0, // Current selected day, month, year
  
    // HTML Elements
    hMth : null, hYear : null, // month/year selector
    hForm : null, hfHead : null, hfDate : null, hfTxt : null, hfDel : null, // event form
  
    // Initialize Calendar
    startup : () => {
      // Get, Set HTML
      cal.hMth = document.getElementById("cal-mth");
      cal.hYear = document.getElementById("cal-yr");
      cal.hForm = document.getElementById("cal-event");
      cal.hfHead = document.getElementById("evt-head");
      cal.hfDate = document.getElementById("evt-date");
      cal.hfTxt = document.getElementById("evt-details");
      cal.hfDel = document.getElementById("evt-del");
      document.getElementById("evt-close").onclick = cal.close;
      cal.hfDel.onclick = cal.del;
      cal.hForm.onsubmit = cal.save;
  
      // Current Date
      let now = new Date(),
          nowMth = now.getMonth(),
          nowYear = parseInt(now.getFullYear());
  
      // Month Selector
      for (let i=0; i<12; i++) {
        let opt = document.createElement("option");
        opt.value = i;
        opt.innerHTML = cal.mName[i];
        if (i==nowMth) { opt.selected = true; }
        cal.hMth.appendChild(opt);
      }
      cal.hMth.onchange = cal.list;
  
      // Year Selector
      for (let i=nowYear-10; i<=nowYear+10; i++) { // 10 year range
        let opt = document.createElement("option");
        opt.value = i;
        opt.innerHTML = i;
        if (i==nowYear) { opt.selected = true; }
        cal.hYear.appendChild(opt);
      }
      cal.hYear.onchange = cal.list;
  
      // call list() to draw the calendar
      cal.list();
    },
  
    // Draws the calendar for the month
    list : () => {
      // Calculates first and last day etc..
      // Jan is 0, Dec is 11
      // Sun is 0, Sat is 6
      cal.sMth = parseInt(cal.hMth.value); // selected month
      cal.sYear = parseInt(cal.hYear.value); // selected year
      let daysInMth = new Date(cal.sYear, cal.sMth+1, 0).getDate(), // number of days in selected month
          startDay = new Date(cal.sYear, cal.sMth, 1).getDay(), // first day of the month
          endDay = new Date(cal.sYear, cal.sMth, daysInMth).getDay(), // last day of the month
          now = new Date(), // current date
          nowMth = now.getMonth(), // current month
          nowYear = parseInt(now.getFullYear()), // current year
          nowDay = cal.sMth==nowMth && cal.sYear==nowYear ? now.getDate() : null ;
  
      // Load Events from Storage or Array (final implementation undecided)
      cal.data = localStorage.getItem("cal-" + cal.sMth + "-" + cal.sYear);
      if (cal.data==null) {
        localStorage.setItem("cal-" + cal.sMth + "-" + cal.sYear, "{}");
        cal.data = {};
      } else { cal.data = JSON.parse(cal.data); }
  
      // Calculations to draw the days of the month
      // Blank squares that pad the month start
      let squares = [];
      if (cal.sMon && startDay != 1) {
        let blanks = startDay==0 ? 7 : startDay ;
        for (let i=1; i<blanks; i++) { squares.push("b"); }
      }
      if (!cal.sMon && startDay != 0) {
        for (let i=0; i<startDay; i++) { squares.push("b"); }
      }
  
      // Days of the month
      for (let i=1; i<=daysInMth; i++) { squares.push(i); }
  
      // Blank squares that pad the month end
      if (cal.sMon && endDay != 0) {
        let blanks = endDay==6 ? 1 : 7-endDay;
        for (let i=0; i<blanks; i++) { squares.push("b"); }
      }
      if (!cal.sMon && endDay != 6) {
        let blanks = endDay==0 ? 6 : 6-endDay;
        for (let i=0; i<blanks; i++) { squares.push("b"); }
      }
  
      // Draw the calendar
      // Get container
      let container = document.getElementById("cal-container"),
      cTable = document.createElement("table");
      cTable.id = "calendar";
      container.innerHTML = "";
      container.appendChild(cTable);
  
      // First row - Day names
      let cRow = document.createElement("tr"),
          days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      if (cal.sMon) { days.push(days.shift()); }
      for (let d of days) {
        let cCell = document.createElement("td");
        cCell.innerHTML = d;
        cRow.appendChild(cCell);
      }
      cRow.classList.add("head");
      cTable.appendChild(cRow);
  
      // Days in Month
      let total = squares.length;
      cRow = document.createElement("tr");
      cRow.classList.add("day");
      for (let i=0; i<total; i++) {
        let cCell = document.createElement("td");
        if (squares[i]=="b") { cCell.classList.add("blank"); }
        else {
          if (nowDay==squares[i]) { cCell.classList.add("today"); }
          cCell.innerHTML = `<div class="dd">${squares[i]}</div>`;
          if (cal.data[squares[i]]) {
            cCell.innerHTML += "<div class='evt'>" + cal.data[squares[i]] + "</div>";
          }
          cCell.onclick = () => { cal.show(cCell); };
        }
        cRow.appendChild(cCell);
        if (i!=0 && (i+1)%7==0) {
          cTable.appendChild(cRow);
          cRow = document.createElement("tr");
          cRow.classList.add("day");
        }
      }
  
      // Reset the Event Form
      cal.close();
    },
  
    // Show the Event form
    show : (el) => {
      // Get existing events
      cal.sDay = el.getElementsByClassName("dd")[0].innerHTML;
      let isEdit = cal.data[cal.sDay] !== undefined ;
  
      // Update Event form
      cal.hfTxt.value = isEdit ? cal.data[cal.sDay] : "" ;
      cal.hfHead.innerHTML = isEdit ? "EDIT EVENT" : "ADD EVENT" ;
      cal.hfDate.innerHTML = `${cal.sDay} ${cal.mName[cal.sMth]} ${cal.sYear}`;
      if (isEdit) { cal.hfDel.classList.remove("ninja"); }
      else { cal.hfDel.classList.add("ninja"); }
      cal.hForm.classList.remove("ninja");
    },
  
    // Close form
    close : () => {
      cal.hForm.classList.add("ninja");
    },
  
    // Save Event
    save : () => {
      cal.data[cal.sDay] = cal.hfTxt.value;
      localStorage.setItem(`cal-${cal.sMth}-${cal.sYear}`, JSON.stringify(cal.data));
      cal.list();
      return false;
    },
  
    // Delete Event
    del : () => { if (confirm("Delete event?")) {
      delete cal.data[cal.sDay];
      localStorage.setItem(`cal-${cal.sMth}-${cal.sYear}`, JSON.stringify(cal.data));
      cal.list();
    }}
  };
  // creates the calendar on page load
  window.addEventListener("load", cal.startup);
  // *END EVENT CALENDAR*



// *COUNTDOWN CLOCK*
function eventCountdown() {
  // current date
  let currentDate = new Date();

  // get the number of days until the event
  let numberOfDays = calculateDays(currentDate);

  // output the result
  document.getElementById('countdown-events').innerHTML = formatCountdown(numberOfDays);
}

function calculateDays(currentDate) {
  // date of E3 2022
  const eventDate = new Date('June 9, 2022');

  //calculate number of days until the event
  let numberOfDays = (eventDate - currentDate) / (1000 * 60  * 60 * 24);
  return numberOfDays;
}

function formatCountdown(numberOfDays) {
  // divide into hours, minutes and seconds
  let hours = (numberOfDays - Math.floor(numberOfDays)) * 24;
  let minutes = (hours - Math.floor(hours)) * 60;
  let seconds = (minutes - Math.floor(minutes)) * 60;

  // round down using floor
  let days = Math.floor(numberOfDays);
  hours = Math.floor(hours);
  minutes = Math.floor(minutes);
  seconds = Math.floor(seconds);

  // Add leading zeros
  hours = (hours < 10) ? ('0' + hours) : hours;
  seconds = (seconds < 10) ? ('0' + seconds) : seconds;
  minutes = (minutes < 10) ? ('0' + minutes) : minutes;

  // format output string
  return `${days}d ${hours}h : ${minutes}m : ${seconds}s`;
}
// *END COUNTDOWN CLOCK*

// initialize the countdown on page load
window.addEventListener("load", setInterval('eventCountdown()', 1000));

