import {setStartTime, runTimer, stopTimer} from "./timer.js";

const timer = document.querySelector('.timer');
const startButton = document.querySelector('#start-timer');
const tomodoroTab = document.querySelector('.tomodoro');
const shortBreakTab = document.querySelector('.short-break');
const longBreakTab = document.querySelector('.long-break');

const openPop = document.querySelector('#settings-button');
const closePop = document.querySelector('#closePop');
const popUp = document.querySelector('#popup');

let tomodoroDuration = "25:00";
let shortBreakDuration = "05:00";
let longBreakDuration = "15:00";

startButton.addEventListener('click', runTimer);
tomodoroTab.addEventListener('click', switchToTomodoro);
shortBreakTab.addEventListener('click', switchToShortBreak);
longBreakTab.addEventListener('click', switchToLongBreak);

const timeInputs = document.querySelectorAll('.time-input');
timeInputs.forEach((timeInput) => {
    timeInput.addEventListener('keyup', () => {
        // Auto-delete characters past 4 digits.
        timeInput.value = timeInput.value.slice(0, 4);
    })
})

// Create the settings pop-up.
openPop.addEventListener('click', () => {
    popUp.classList.add("open");
});

// Close the settings pop-up and execute changes.
closePop.addEventListener('click', () => {
    let tomodoroTimeInput = document.querySelector(".tomodoro-time-input").value;
    let shortBreakTimeInput = document.querySelector(".short-break-time-input").value;
    let longBreakTimeInput = document.querySelector(".long-break-time-input").value;

    tomodoroDuration = (tomodoroTimeInput < 10 ? "0" : "") + tomodoroTimeInput + ":00";
    shortBreakDuration = (shortBreakTimeInput < 10 ? "0" : "") + shortBreakTimeInput + ":00";
    longBreakDuration = (longBreakTimeInput < 10 ? "0" : "") + longBreakTimeInput + ":00";

    switchToTomodoro();
    timer.innerHTML = tomodoroDuration;
    setStartTime(tomodoroDuration);

    popUp.classList.remove("open");
});

// Switch to the Tomodoro tab if not already active.
function switchToTomodoro() {
    if (!tomodoroTab.classList.contains('selected')) {
        stopTimer();

        shortBreakTab.classList.remove('selected');
        longBreakTab.classList.remove('selected');
        tomodoroTab.classList.add('selected');

        timer.innerHTML = tomodoroDuration;
        setStartTime(tomodoroDuration);
    }
}

// Switch to the Short Break tab if not already active.
function switchToShortBreak() {
    if (!shortBreakTab.classList.contains('selected')) {
        stopTimer();

        tomodoroTab.classList.remove('selected');
        longBreakTab.classList.remove('selected');
        shortBreakTab.classList.add('selected');

        timer.innerHTML = shortBreakDuration;
        setStartTime(shortBreakDuration);
    }
}

// Switch to the Long Break tab if not already active.
function switchToLongBreak() {
    if (!longBreakTab.classList.contains('selected')) {
        stopTimer();

        tomodoroTab.classList.remove('selected');
        shortBreakTab.classList.remove('selected');
        longBreakTab.classList.add('selected');

        timer.innerHTML = longBreakDuration;
        setStartTime(longBreakDuration);
    }
}