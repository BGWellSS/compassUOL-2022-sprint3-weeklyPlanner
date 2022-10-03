// ---------- Global variables
// - Date DOM
const dateDOM = document.getElementsByClassName("timer-date");
// - Timer DOM
const timerDOM = document.getElementsByClassName("timer-hour");
// - Card DOM
const cardTextDOM = document.getElementById("input-actText");
const cardWeekDayDOM = document.getElementById("input-actWeekDay");
const cardTimeDOM = document.getElementById("input-actTime");
const calendarTimerDOM = document.getElementById("calendar-side");
// - Card List
const cardsList = [];
// - Button DOM -> Add card Activity
const addActivityButton = document.getElementById("activity-add");
// - Button DOM -> Save Local Storage
const saveLSDOM = document.getElementById("saver-localStorage");
// - Button DOM -> Delete Local Storage
const deleteLSDOM = document.getElementById("delete-localStorage");
// - Storage Card splitter
const lsCardSplitter = "__@__";
// - Storage Atributte splitter
const lsAtributeSplitter = "_§_";

// ---------- Functions
// - Time
function updateCurrentTime() {
  timerDOM[0].textContent = getCurrentTime();
}

// ---- Activity cards
// - Create card
function createHTMLCard(card) {
  return `<div class="cards card-w${card.weekDay}">
              <p class="card-text">${card.text}</p>
              <button type="button" class="button delete-card">
                Apagar
              </button>
            </div>`;
}
// - Create card time
function createHTMLCardTime(card) {
  return `<div class="calendar-hour timer-w${card.weekDay}">
              <p class="timer-text">${card.time}</p>
            </div>`;
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
  calendarTimerDOM.innerHTML =
    '<div class="calendar-hour calendar-title"><span>Horário</span></div>';
}
// - Update Panel cards
function updatePanel() {
  sortCardsList();
  let timeCheck = "";
  clearPanels();
  clearTimePanel();
  for (let index = 0; index < cardsList.length; index++) {
    const weekPanelDOM = document.getElementById(
      `weekDay${cardsList[index].weekDay}`
    );
    weekPanelDOM.innerHTML += cardsList[index].cardHtml;
    if (timeCheck != cardsList[index].time) {
      calendarTimerDOM.innerHTML += cardsList[index].timeHtml;
      timeCheck = cardsList[index].time;
    }
  }
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
// - Save Local Storage
function saveToLocalStorage() {
  if (typeof Storage !== "undefined") {
    let storageValue = "";
    for (let index = 0; index < cardsList.length; index++) {
      if (index !== 0) {
        storageValue += lsCardSplitter;
      }
      storageValue += `${cardsList[index].text}${lsAtributeSplitter}${cardsList[index].weekDay}${lsAtributeSplitter}${cardsList[index].time}`;
    }
    localStorage.setItem("storageCards", storageValue);
  } else {
    console.log("Sorry, no LocalStorage suport");
  }
}
// - Delete Local Storage
function deleteLocalStorage() {
  localStorage.clear();
}
// - Checker Local Storage Content
function lsChecker(storageVarName) {
  const listStringToCheck = localStorage.getItem(storageVarName);
  if (listStringToCheck !== "" && listStringToCheck !== null) {
    const listToCheck = listStringToCheck.split(lsCardSplitter);
    for (let index = 0; index < listToCheck.length; index++) {
      const cardAtributes = listToCheck[index].split(lsAtributeSplitter);
      const cardLS = createActivity(
        cardAtributes[0],
        parseInt(cardAtributes[1]),
        cardAtributes[2]
      );
      cardLS.cardHtml = createHTMLCard(cardLS);
      cardLS.timeHtml = createHTMLCardTime(cardLS);
      addCardtoList(cardLS);
    }
    updatePanel();
  }
}

// ---------- Page Actions
// - Page timer
setInterval(updateCurrentTime, 1000);
dateDOM[0].textContent = getCurrentDay();
// - Local Storage Checker
lsChecker("storageCards");
// - Button Save Local Storage
saveLSDOM.onclick = saveToLocalStorage;
// - Button Exclude Local Storage
deleteLSDOM.onclick = deleteLocalStorage;
// - Button add activity
addActivityButton.onclick = processAddButton;
