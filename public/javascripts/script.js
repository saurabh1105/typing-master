const RANDOM_QUOTE_API_URL = "http://api.quotable.io/random";
const quoteDisplayElement = document.getElementById("quoteDisplay");
const quoteInputElement = document.getElementById("quoteInput");
const timerElement = document.getElementById("timer");

quoteInputElement.addEventListener("input", () => {
  const arrayQuote = quoteDisplayElement.querySelectorAll("span");
  const arrayValue = quoteInputElement.value.split("");

  let correct = true;
  arrayQuote.forEach((characterSpan, index) => {
    const character = arrayValue[index];
    if (character == null) {
      characterSpan.classList.remove("correct");
      characterSpan.classList.remove("incorrect");
      correct = false;
    } else if (character === characterSpan.innerText) {
      characterSpan.classList.add("correct");
      characterSpan.classList.remove("incorrect");
    } else {
      characterSpan.classList.remove("correct");
      characterSpan.classList.add("incorrect");
      correct = false;
    }
  });

  if (correct) renderNewQuote();
});

function getRandomQuote() {
  return fetch(RANDOM_QUOTE_API_URL)
    .then((response) => response.json())
    .then((data) => data.content);
}

async function renderNewQuote() {
  const quote = await getRandomQuote();
  quoteDisplayElement.innerHTML = "";
  var len = quote.length;
  quote.split("").forEach((character) => {
    const characterSpan = document.createElement("span");
    characterSpan.innerText = character;
    quoteDisplayElement.appendChild(characterSpan);
  });
  let name = document.title;
  console.log(name);
  if (!isNaN(getTimerTime())) localStorage.setItem(name, len / getTimerTime());
  if (localStorage.getItem(name) == "0") {
    var score = document.getElementById("score");

    localStorage.setItem(name, len / getTimerTime());
    score.innerHTML = `Prev Score is ${getTimerTime()}`;
  }
  onloading();
  quoteInputElement.value = null;
  startTimer();
}

let startTime;
function startTimer() {
  timerElement.innerText = 0;
  startTime = new Date();
  setInterval(() => {
    timer.innerText = getTimerTime();
  }, 1000);
}

function getTimerTime() {
  return Math.floor((new Date() - startTime) / 1000);
}
function onloading() {
  var name = document.title;
  console.log("function called");
  if (!window.localStorage.getItem(name)) {
    localStorage.setItem(name, 0);
    var score = document.getElementById("score");
    score.innerHTML = `you have not played the game yet`;
  } else {
    var score = document.getElementById("score");
    score.innerHTML = `Prev Score is ${localStorage.getItem(name)}`;
  }
}

renderNewQuote();
