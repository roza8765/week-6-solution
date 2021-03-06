// Implement the missing functionality according to the task description.
// Hint: Remember which function you need to call when it's time to alarm.
//Dom elements

//this is the simple version, if you like to see the advance version you need to uncomment some stuff in the html file
const userInput = document.getElementById("alarmSet");
const displayScreen = document.getElementById("timeRemaining");
let secondsRemaining;
let intervalId;
function setAlarm() {
  secondsRemaining = getSecondsFromInput();
  updateDisplay(secondsRemaining);
  intervalId = setInterval(() => tick(), 1000);
}

function tick() {
  secondsRemaining -= 1;
  updateDisplay(secondsRemaining);
  if (secondsRemaining <= 0) {
    playAlarm();
    clearInterval(intervalId);
  }
}
//SOLID
function getSecondsFromInput() {
  return Number(userInput.value);
}

function updateDisplay(seconds) {
  const pad = function (n) {
    return n.toString().padStart(2, "0");
  }; //if you don't want padstart (browser compatibility), you can use a mix of repeat and slice to do same effect

  const mm = pad(Math.floor(seconds / 60));
  const ss = pad(seconds % 60);

  const msg = `Time Remaining: ${mm}:${ss}`;
  displayScreen.textContent = msg;
}
function stopAlarm() {
  clearInterval(intervalId);
}
// DO NOT EDIT BELOW HERE
/* 
 Try to reason about the code below and understand what it will do.
 You will see that it attaches some event listeners to buttons on the page as well as how to play Audio from JS.
 If you don't remember how to use events, please revisit the previous lession.
*/

/* 
 Open the documentation below if you are keen to know what is Audio object and how it works
 Audio documentation: https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement/Audio
*/
var audio = new Audio("alarmsound.mp3");

function setup() {
  document.getElementById("set").addEventListener("click", () => {
    setAlarm();
  });

  document.getElementById("stop").addEventListener("click", () => {
    pauseAlarm();
    stopAlarm();
  });
}

function playAlarm() {
  audio.play();
}

function pauseAlarm() {
  audio.pause();
}

/*
 This "window.onload" construct below might be something new that you haven't seen before.
 
 Window Object represents the current open window (tab) in the browser.
 The Window interface contains loads of functionality among others the reference to the DOM Object.
 
 Here you can read more about window interface and see what properties it has:
 https://developer.mozilla.org/en-US/docs/Web/API/Window

 We use the "onload" Window event to run a function when all resources and the DOM has been loaded and ready to use.
 This ensures that "setup" function can find the elements defined in index.html file even if the script HTML tag
 in the index file is appears earlier than the actual HTML elements we look up inside that function. 
 
 You can play and try to see what happens if you replace "window.onload = setup;" with "setup();" function call instead.
 If you open the browser console, you should see an error "Cannot read property 'addEventListener' of null".
 It occurs because this script is being executed earlier and the elements it tries to find hasn't been yet loaded.
 (An alternative way to fix it is by moving the script tags after element with the id "stop".)
 
 Documentation for onload event documentation: https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onload
*/
window.onload = setup;
