import {setStartTime, runTimer, stopTimer} from "./timer.js";

const timer = document.querySelector('.timer');
const startButton = document.querySelector('#start-timer');
const tomodoroTab = document.querySelector('.tomodoro');
const shortBreakTab = document.querySelector('.short-break');
const longBreakTab = document.querySelector('.long-break');

const openPop = document.querySelector('#settings-button');
const pickColors = document.querySelector('#pick-colors');
const closePop = document.querySelector('#closePop');
const popUp = document.querySelector('#popup');

let tomodoroDuration = "25:00";
let shortBreakDuration = "05:00";
let longBreakDuration = "15:00";

startButton.addEventListener('click', runTimer);
tomodoroTab.addEventListener('click', switchToTomodoro);
shortBreakTab.addEventListener('click', switchToShortBreak);
longBreakTab.addEventListener('click', switchToLongBreak);

// Create the settings pop-up.
openPop.addEventListener('click', () => {
    popUp.classList.add("open");
});

const timeInputs = document.querySelectorAll('.time-input');
timeInputs.forEach((timeInput) => {
    timeInput.addEventListener('keyup', () => {
        // Auto-delete characters past 4 digits.
        timeInput.value = timeInput.value.slice(0, 4);
    })
})

const backgroundColorDiv = document.querySelector('#background-color');
if (backgroundColorDiv && backgroundColorDiv.innerHTML.includes("#")) {
    // Set the background, buttons, and text colors to the AI-generated hexcodes.
    const root = document.querySelector(':root');
    
    const buttonsColorDiv = document.querySelector('#buttons-color');
    const textColorDiv = document.querySelector('#text-color');

    root.style.setProperty("--bg-gradient-color", backgroundColorDiv.innerHTML);
    root.style.setProperty("--buttons-color", buttonsColorDiv.innerHTML);
    root.style.setProperty("--text-color", textColorDiv.innerHTML);
}

// Execute time changes and close the settings pop-up.
closePop.addEventListener('click', () => {
    let tomodoroTimeInput = document.querySelector(".tomodoro-time-input").value;
    let shortBreakTimeInput = document.querySelector(".short-break-time-input").value;
    let longBreakTimeInput = document.querySelector(".long-break-time-input").value;

    if (parseInt(shortBreakTimeInput) > parseInt(longBreakTimeInput)) {
        alert("Your short break cannot be longer than your long break!");
        return;
    }

    let tomodoroHours = Math.floor(tomodoroTimeInput / 60);
    let tomodoroMinutes = tomodoroTimeInput % 60;
    let shortBreakHours = Math.floor(shortBreakTimeInput / 60);
    let shortBreakMinutes = shortBreakTimeInput % 60;
    let longBreakHours = Math.floor(longBreakTimeInput / 60);
    let longBreakMinutes = longBreakTimeInput % 60;

    // Concatenate the times together. Hours are excluded if they are 0,
    // and we pad a '0' in front of values < 10.
    tomodoroDuration = (tomodoroHours > 0 ? ((tomodoroHours < 10 ? "0" : "") + tomodoroHours + ":") : "")
                       + (tomodoroMinutes < 10 ? "0" : "") + tomodoroMinutes + ":00";
    shortBreakDuration = (shortBreakHours > 0 ? ((shortBreakHours < 10 ? "0" : "") + shortBreakHours + ":") : "")
                         + (shortBreakMinutes < 10 ? "0" : "") + shortBreakMinutes + ":00";
    longBreakDuration = (longBreakHours > 0 ? ((longBreakHours < 10 ? "0" : "") + longBreakHours + ":") : "")
                        + (longBreakMinutes < 10 ? "0" : "") + longBreakMinutes + ":00";

    if (tomodoroTab.classList.contains('selected')) {                    
        timer.innerHTML = tomodoroDuration;
        setStartTime(tomodoroDuration);
    } else {
        switchToTomodoro();
    }

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

    typingEffect(timer, timer.innerHTML);
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

        typingEffect(timer, timer.innerHTML);
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

        typingEffect(timer, timer.innerHTML);
    }
}

function typingEffect(element, text, i = 0) {
    if (i === 0) {
        element.textContent = "";
    }
    if (i < text.length) {
        element.textContent += text.charAt(i);
        setTimeout(() => typingEffect(element, text, i + 1), 200);
    }
}

//typing effect for whatever number is on screen when it loads
window.onload = () => {
    const timerElement = document.querySelector('.timer');
    typingEffect(timerElement, timerElement.innerHTML);
}

//one observer to create animations for the timer and its buttons to come in from the bottom
const observerInput = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show-timer-buttons');
            //stop observing after the animation plays once so that it doesn't replay everytime the user scrolls up
            observerInput.unobserve(entry.target);
        } else {
            entry.target.classList.remove('show-timer-buttons');
            observerInput.unobserve(entry.target);
        }
    });
})

//observer for tom
const hiddenTimerElements = document.querySelectorAll(".hidden-timer-buttons");
hiddenTimerElements.forEach((el) => observerInput.observe(el));


//second observer to create animations for Tom which is to come in from the right
const observerTom = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show-tom');
            //stop observing after the animation plays once so that it doesn't replay everytime the user scrolls up
            observerTom.unobserve(entry.target);
        } else {
            entry.target.classList.remove('show-tom');
            observerTom.unobserve(entry.target);
        }
    });
})

//observer for timer buttons and text
const hiddenElementsTom = document.querySelectorAll(".hidden-tom");
hiddenElementsTom.forEach((el) => observerTom.observe(el));