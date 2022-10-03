// ---------- Global variables
// - Date
const dateHTML = document.getElementsByClassName("timer-date");
dateHTML[0].textContent = getCurrentDay();
// - Timer
const timerHTML = document.getElementsByClassName("timer-hour");
// - Card DOM
const cardTextDOM = document.getElementById("input-actText");
const cardWeekDayDOM = document.getElementById("input-actWeekDay");
const cardTimeDOM = document.getElementById("input-actTime");
const calendarTimerDOM = document.getElementById("calendar-side");
// - Card List
const cardsList = [];
// - Button DOM -> Add card Activity
const addActivityButton = document.getElementById("activity-add");

// ---------- Functions
// - Time
function updateCurrentTime() {
  timerHTML[0].textContent = getCurrentTime();
}

// ---- Activity cards
// - Create card
function createHTMLCard(card) {
  return ( `<div class="cards card-w${card.weekDay}">
              <p class="card-text">${card.text}</p>
              <button type="button" class="button delete-card">
                Apagar
              </button>
            </div>` );
}
// - Create card time
function createHTMLCardTime(card) {
  return ( `<div class="calendar-hour timer-w${card.weekDay}">
              <p class="timer-text">${card.time}</p>
            </div>` );
}
// - Add card to List
function addCardtoList(card) {
  cardsList.push(card);
}
// - Sort List
function sortCardsList() {
  cardsList.sort(function (x, y) {
    let a = x.time,
        b = y.time;
    return a == b ? 0 : a > b ? 1 : -1;
  });
}
// - Clear Panels
function clearPanels() {
  for (let index = 1; index <= 7; index++) {
    document.getElementById(`weekDay${index}`).innerHTML = "";
  }
}
// - Clear Time Panel
function clearTimePanel() {
  calendarTimerDOM.innerHTML = '<div class="calendar-hour calendar-title"><span>Horário</span></div>';
}
// - Update Panel cards
function updatePanel() {
  sortCardsList();
  let timeCheck = "";
  clearPanels();
  clearTimePanel();
  for (let index = 0; index < cardsList.length; index++) {
    const weekPanelDOM = document.getElementById(`weekDay${cardsList[index].weekDay}`);
    weekPanelDOM.innerHTML += cardsList[index].cardHtml;
    if (timeCheck != cardsList[index].time) {
      calendarTimerDOM.innerHTML += cardsList[index].timeHtml;
      timeCheck = cardsList[index].time;
    }
  }
  console.table(cardsList);
}
// - Process add button action
function processAddButton() {
  const cardActivity = createActivity(
    cardTextDOM.value,
    parseInt(cardWeekDayDOM.value),
    cardTimeDOM.value
  );
  if (checkCardEmpty(cardActivity)) {
    cardTextDOM.classList.remove("activity-empty");
    cardTextDOM.focus();
    cardActivity.cardHtml = createHTMLCard(cardActivity);
    cardActivity.timeHtml = createHTMLCardTime(cardActivity);
    addCardtoList(cardActivity);
    updatePanel();
  } else {
    cardTextDOM.classList.add("activity-empty");
    cardTextDOM.focus();
  }
}
// ---------- Page Actions
setInterval(updateCurrentTime, 1000);
getCurrentDay();
// - Button add activity
addActivityButton.onclick = processAddButton;
