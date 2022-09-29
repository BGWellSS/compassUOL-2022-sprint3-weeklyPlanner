// ---- Date and Time
// - Time
const timerHTML = document.getElementsByClassName('timer-hour');
function updateCurrentTime() {
  timerHTML[0].textContent = getCurrentTime();
}
setInterval(updateCurrentTime, 1000);
getCurrentDay();
// - Date
const dateHTML = document.getElementsByClassName('timer-date');
dateHTML[0].textContent = getCurrentDay();
