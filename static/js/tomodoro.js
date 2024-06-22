import {setStartTime, runTimer, stopTimer} from "./timer.js";

const timer = document.querySelector('.timer');
const startButton = document.querySelector('#start-timer');
const tomodoroTab = document.querySelector('.tomodoro');
const shortBreakTab = document.querySelector('.short-break');
const longBreakTab = document.querySelector('.long-break');

const tomodoroDuration = "25:00";
const shortBreakDuration = "00:01";
const longBreakDuration = "15:00";

startButton.addEventListener('click', runTimer);
tomodoroTab.addEventListener('click', switchToTomodoro);
shortBreakTab.addEventListener('click', switchToShortBreak);
longBreakTab.addEventListener('click', switchToLongBreak);

/**
 * Switch to the Tomodoro tab if not already active.
 */
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

/**
 * Switch to the Short Break tab if not already active.
 */
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

/**
 * Switch to the Long Break tab if not already active.
 */
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