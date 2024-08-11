import { setStartTime, runTimer, stopTimer } from "./timer.js";

const timer = document.querySelector('.timer');
const startButtons = document.querySelectorAll('#start-timer, .tom-image img');
const tomodoroTab = document.querySelector('.tomodoro');
const shortBreakTab = document.querySelector('.short-break');
const longBreakTab = document.querySelector('.long-break');

const popUp = document.querySelector('#popup');

// Initialize timer duration from local storage or use default timer values.
let tomodoroDuration = localStorage.getItem("tomodoroDuration") || "25:00";
let shortBreakDuration = localStorage.getItem("shortBreakDuration") || "05:00";
let longBreakDuration = localStorage.getItem("longBreakDuration") || "15:00";

setStartTime(tomodoroDuration);

let typeInterval;

initializeColors();
initializeTimeValues();
window.onload = () => {
    typingEffect(timer, tomodoroDuration);
}

// Start the timer.
startButtons.forEach((startButton) => {
    startButton.addEventListener('click', () => {
        clearInterval(typeInterval);
        runTimer();
    });
});

const openPop = document.querySelector('#settings-button');
openPop.addEventListener('click', () => {
    popUp.classList.add("open");
});

const timeInputs = document.querySelectorAll('.time-input');
timeInputs.forEach((timeInput) => {
    timeInput.addEventListener('keyup', () => {
        // Auto-delete time input characters past 4 digits.
        timeInput.value = timeInput.value.slice(0, 4);
    })
})

// Execute settings changes and close the pop up.
const closePop = document.querySelector('#closePop');
closePop.addEventListener('click', () => {
    stopTimer();
    
    checkAndSetTimes();

    checkAndSetColors();

    popUp.classList.remove("open");
});

const cancel = document.querySelector('#cancel');
cancel.addEventListener('click', () => {
    popUp.classList.remove("open");
});

const pickColors = document.querySelector('#pick-colors');
pickColors.addEventListener('click', () => {
    // Disable the pickColors button when clicked to prevent server overload.
    pickColors.style["pointer-events"] = "none";

    // Set the AI flag so that when the page reloads, the AI-generated colors
    // are loaded in.
    localStorage.setItem("ai-flag", "true");
})

tomodoroTab.addEventListener('click', switchToTomodoro);
shortBreakTab.addEventListener('click', switchToShortBreak);
longBreakTab.addEventListener('click', switchToLongBreak);

// Switch to the Tomodoro tab if not already active.
function switchToTomodoro() {
    if (!tomodoroTab.classList.contains('selected')) {
        stopTimer();

        shortBreakTab.classList.remove('selected');
        longBreakTab.classList.remove('selected');
        tomodoroTab.classList.add('selected');

        setStartTime(tomodoroDuration);

        clearInterval(typeInterval);
        typingEffect(timer, tomodoroDuration);
    }
}

// Switch to the Short Break tab if not already active.
function switchToShortBreak() {
    if (!shortBreakTab.classList.contains('selected')) {
        stopTimer();

        tomodoroTab.classList.remove('selected');
        longBreakTab.classList.remove('selected');
        shortBreakTab.classList.add('selected');

        setStartTime(shortBreakDuration);

        clearInterval(typeInterval);
        typingEffect(timer, shortBreakDuration);
    }
}

// Switch to the Long Break tab if not already active.
function switchToLongBreak() {
    if (!longBreakTab.classList.contains('selected')) {
        stopTimer();

        tomodoroTab.classList.remove('selected');
        shortBreakTab.classList.remove('selected');
        longBreakTab.classList.add('selected');

        setStartTime(longBreakDuration);

        clearInterval(typeInterval);
        typingEffect(timer, longBreakDuration);
    }
}

/**
 * Initialize the colors of the page, and the dropdown color values of
 * the settings pop up if they are stored.
 */
function initializeColors() {
    const storedBg = localStorage.getItem("bg-color") || "bg-green";
    const storedMid = localStorage.getItem("bg-middle") || "bg-white";
    const storedBtn = localStorage.getItem("btn-color") || "btn-green";
    const storedTxt = localStorage.getItem("txt-color") || "txt-white";

    setColors(storedBg, storedMid, storedBtn, storedTxt);

    const bgBottomDropDown = document.querySelector('.dropdown-bg');
    const bgMidDropDown = document.querySelector('.dropdown-bg2');
    const btnDropDown = document.querySelector('.dropdown-btn');
    const txtDropDown = document.querySelector('.dropdown-txt');
    if (!(storedBg.includes('#'))) {
        bgBottomDropDown.value = storedBg;
    }
    if (!(storedMid.includes('#'))) {
        bgMidDropDown.value = storedMid;
    }
    if (!(storedBtn.includes('#'))) {
        btnDropDown.value = storedBtn;
    }
    if (!(storedTxt.includes('#'))) {
        txtDropDown.value = storedTxt;
    }
}

/**
 * Initialize the time values in the settings pop up.
 */
function initializeTimeValues() {
    const tomodoroTimeValues = tomodoroDuration.split(':');
    const shortBreakTimeValues = shortBreakDuration.split(':');
    const longBreakTimeValues = longBreakDuration.split(':');

    const tomodoroTotalMinutes = tomodoroTimeValues.length >= 3
                                 ? parseInt(tomodoroTimeValues[0]) * 60 + parseInt(tomodoroTimeValues[1])
                                 : parseInt(tomodoroTimeValues[0]);
    const shortBreakTotalMinutes = shortBreakTimeValues.length >= 3
                                   ? parseInt(shortBreakTimeValues[0]) * 60 + parseInt(shortBreakTimeValues[1])
                                   : parseInt(shortBreakTimeValues[0]);
    const longBreakTotalMinutes = longBreakTimeValues.length >= 3
                                  ? parseInt(longBreakTimeValues[0]) * 60 + parseInt(longBreakTimeValues[1])
                                  : parseInt(longBreakTimeValues[0]);

    document.querySelector(".tomodoro-time-input").value = tomodoroTotalMinutes;
    document.querySelector(".short-break-time-input").value = shortBreakTotalMinutes;
    document.querySelector(".long-break-time-input").value = longBreakTotalMinutes;
}

// Check if colors were generated by AI.
if (localStorage.getItem("ai-flag") && localStorage.getItem("ai-flag") === "true") {
    // Set the background, buttons, and text colors to the AI-generated hexcodes.
    const backgroundColorDiv = document.querySelector('#background-color');
    const middleColorDiv = document.querySelector('#middle-color');
    const buttonsColorDiv = document.querySelector('#buttons-color');
    const textColorDiv = document.querySelector('#text-color');

    const bgSelectedValue = backgroundColorDiv.innerHTML;
    const bgMidValue = middleColorDiv.innerHTML;
    const btnSelectedValue = buttonsColorDiv.innerHTML;
    const txtSelectedValue = textColorDiv.innerHTML;

    saveColors(bgSelectedValue, bgMidValue, btnSelectedValue, txtSelectedValue);
    setColors(bgSelectedValue, bgMidValue, btnSelectedValue, txtSelectedValue);

    localStorage.setItem("ai-flag", "false");
}

/**
 * Set the times to the given inputs and save
 * them to local storage.
 */
function checkAndSetTimes() {
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

    localStorage.setItem("tomodoroDuration", tomodoroDuration);
    localStorage.setItem("shortBreakDuration", shortBreakDuration);
    localStorage.setItem("longBreakDuration", longBreakDuration);

    if (tomodoroTab.classList.contains('selected')) {                    
        timer.innerHTML = tomodoroDuration;
        setStartTime(tomodoroDuration);
    } else if (shortBreakTab.classList.contains('selected')) {
        timer.innerHTML = shortBreakDuration;
        setStartTime(shortBreakDuration);
    } else {
        timer.innerHTML = longBreakDuration;
        setStartTime(longBreakDuration);
    }
}

/**
 * If any dropdown values were set by the user, save them to
 * local storage and set the page colors to them. Triggered
 * upon saving the settings popup.
 */
function checkAndSetColors() {
    const bgSelectedValue = document.querySelector('.dropdown-bg').value;
    const bgMiddleValue = document.querySelector('.dropdown-bg2').value;
    const btnSelectedValue = document.querySelector('.dropdown-btn').value;
    const txtSelectedValue = document.querySelector('.dropdown-txt').value;

    const bgSelectedColor = (bgSelectedValue !== "none") ? bgSelectedValue : localStorage.getItem("bg-color");
    const bgMiddleColor = (bgMiddleValue !== "none") ? bgMiddleValue : localStorage.getItem("bg-middle");
    const btnColor = (btnSelectedValue !== "none") ? btnSelectedValue : localStorage.getItem("btn-color");
    const txtColor = (txtSelectedValue !== "none") ? txtSelectedValue : localStorage.getItem("txt-color");

    saveColors(bgSelectedColor, bgMiddleColor, btnColor, txtColor);
    setColors(bgSelectedColor, bgMiddleColor, btnColor, txtColor);
}

/**
 * Save the given colors to local storage, removing all
 * blank space. Can be provided as hexcodes or variables
 * (e.g. "btn-red").
 * 
 * @param {string} bgColor 
 * @param {string} midColor 
 * @param {string} btnColor 
 * @param {string} txtColor 
 */
function saveColors(bgColor, midColor, btnColor, txtColor) {
    localStorage.setItem("bg-color", bgColor.replaceAll(' ', '').replaceAll('\n', ''));
    localStorage.setItem("bg-middle", midColor.replaceAll(' ', '').replaceAll('\n', ''));
    localStorage.setItem("btn-color", btnColor.replaceAll(' ', '').replaceAll('\n', ''));
    localStorage.setItem("txt-color", txtColor.replaceAll(' ', '').replaceAll('\n', ''));
}

/**
 * Set the page colors to the given colors, formatting
 * values if necessary. Can be provided as hexcodes or
 * variables (e.g. "btn-red") which are converted to rgb
 * format for proper CSS integration.
 * 
 * @param {string} bgColor 
 * @param {string} midColor 
 * @param {string} btnColor 
 * @param {string} txtColor 
 */
function setColors(bgColor, midColor, btnColor, txtColor) {
    const root = document.querySelector(':root');

    // If any values are variables, convert them to RGB format.
    if (!bgColor.includes('#')) {
        bgColor = convertVariableToRGB(bgColor);
    }
    if (!midColor.includes('#')) {
        midColor = convertVariableToRGB(midColor);
    }
    if (!btnColor.includes('#')) {
        btnColor = convertVariableToRGB(btnColor);
    }
    if (!txtColor.includes('#')) {
        txtColor = convertVariableToRGB(txtColor);
    }

    root.style.setProperty('--bg-gradient-color', bgColor);
    root.style.setProperty('--bg-mid-color', midColor);
    root.style.setProperty('--buttons-color', btnColor);
    root.style.setProperty('--text-color', txtColor);
}

/**
 * Convert the given color, which is in variable format,
 * to RGB format (e.g. "btn-red -> "rgb(250, 17, 17)").
 * @param {string} colorVar
 */
function convertVariableToRGB(colorVar) {
    const root = document.querySelector(':root');
    const formatted = "--" + colorVar;
    return getComputedStyle(root).getPropertyValue(formatted);
}

/* ANIMATIONS */

//one observer to create animations for the timer and its buttons to come in from the bottom
const observerInput = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        entry.target.classList.add('show-timer-buttons');
        //stop observing after the animation plays once so that it doesn't replay everytime the user scrolls up
        observerInput.unobserve(entry.target);
    });
})

//observer for tom
const hiddenTimerElements = document.querySelectorAll(".hidden-timer-buttons");
hiddenTimerElements.forEach((el) => observerInput.observe(el));

//second observer to create animations for Tom which is to come in from the right
const observerTom = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        entry.target.classList.add('show-tom');
        //stop observing after the animation plays once so that it doesn't replay everytime the user scrolls up
        observerTom.unobserve(entry.target);
    });
})

//observer for timer buttons and text
const hiddenElementsTom = document.querySelectorAll(".hidden-tom");
hiddenElementsTom.forEach((el) => observerTom.observe(el));

async function typingEffect(element, text) {
    setTimeout(() => {
        startButtons.forEach((startButton) => {
            startButton.style["pointer-events"] = "none"; // disable starting the timer until the animation finishes.
        })
        element.textContent = text[0] + text[1];
    }, 0);

    let ch = 2;
    typeInterval = setInterval(() => {
        element.textContent += text[ch];
        ch += 1;
        if (ch == text.length) {
            clearInterval(typeInterval);
            startButtons.forEach((startButton) => {
                startButton.style["pointer-events"] = "all";
            })
        }
    }, 200);
}

/*
* EXIT ANIMATION CODE: We first select all the a href tags on the page- these are only used to lead away from the page itself
* so page functionality isn't impacted. We then add an event listener for these links, and if any of them is clicked, we call 
* preventDefault() to prevent them from directly sending the user to the next page. We then put all the elements we want to have disappear 
* (in this case everything but the menu bar and footer) on the exit-animation classlist, which makes them fade into opacity 0. After that, 
* the link directs the user to the page containing the link.
*/
const allLinks = document.querySelectorAll('.nav-items a');

allLinks.forEach(link => {
   if(!link.classList.contains('small-menu-link')) {
       link.addEventListener('click', (event) => {

           //stops link from just sending the user to the next page.
           event.preventDefault();

           //add everything below the menu bar and above the footer to the exit animation class list so the animation plays.
           const formElements = document.getElementById('timer-div');
           formElements.classList.add('exit');

           //delay after animation and send the user to the link
           setTimeout(() => {
               window.location.href = link.href;
           }, 500);
       });
   }
 });

document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('.icon').addEventListener('click', function () {
        var x = document.getElementById('navbar');
        if (x.className === 'nav-items') {
            x.className += ' responsive';
        } else {
            x.className = 'nav-items';
        }
    });
});