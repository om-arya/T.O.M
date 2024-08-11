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

import {setStartTime, runTimer, stopTimer} from "./timer.js";

/* initialize variables for the timer and buttons*/
const timer = document.querySelector('.timer');
const startButton = document.querySelector('#start-timer');
const tomodoroTab = document.querySelector('.tomodoro');
const shortBreakTab = document.querySelector('.short-break');
const longBreakTab = document.querySelector('.long-break');

/* initialize variable for the popup buttons*/
const openPop = document.querySelector('#settings-button');
const closePop = document.querySelector('#closePop');
const cancel = document.querySelector('#cancel');
const popUp = document.querySelector('#popup');
const pickColors = document.querySelector('#pick-colors');

/* temp variables for local storage values*/
let storedBg;
let storedMid;
let storedBtn;
let storedTxt;
let AiFlag;

// Initialize timer duration from local storage or use default timer values
let tomodoroDuration = localStorage.getItem("tomodoroDuration") || "25:00";
let shortBreakDuration = localStorage.getItem("shortBreakDuration") || "05:00";
let longBreakDuration = localStorage.getItem("longBreakDuration") || "15:00";

setStartTime(tomodoroDuration);

let typeInterval;

window.onload = () => {
    typingEffect(timer, tomodoroDuration);

    //retrieve values from local storage
    storedBg = localStorage.getItem("bg-color");
    storedMid = localStorage.getItem("bg-middle");
    storedBtn = localStorage.getItem("btn-color");
    storedTxt = localStorage.getItem("txt-color");
    AiFlag = localStorage.getItem("Ai-flag");
    
    /* checks if the colors were from AI or dropdown and chooses the correct function*/
    if(AiFlag == "true") {
        checkAndAssignColorsAI(storedBg, storedMid, storedBtn, storedTxt);
    } else {
        checkAndAssignColors(storedBg, storedMid, storedBtn, storedTxt);
    }

    /*Set dropdown values to be the ones stored in local storage. First get the dropdown using querySelector, 
    then set the value of the dropdown to be the one stored in local storage.*/
    const bgBottomDropDown = document.querySelector('.dropdown-bg');
    bgBottomDropDown.value = storedBg;

    const bgMidDropDown = document.querySelector('.dropdown-bg2');
    bgMidDropDown.value = storedMid;

    const btnDropDown = document.querySelector('.dropdown-btn');
    btnDropDown.value = storedBtn;

    const txtDropDown = document.querySelector('.dropdown-txt');
    txtDropDown.value = storedTxt;
}

/* add event listener for start button*/
startButton.addEventListener('click', () => {
    clearInterval(typeInterval);
    runTimer(); //timer function
});

/* add event listeners for each of the three timer mode buttons*/
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

/* checks if color was generated by AI*/
const backgroundColorDiv = document.querySelector('#background-color');
if (backgroundColorDiv && backgroundColorDiv.innerHTML.includes("#")) {
    // Set the background, buttons, and text colors to the AI-generated hexcodes.
    const root = document.querySelector(':root');
    
    //retrieve the colors
    const middleColorDiv = document.querySelector('#middle-color');
    const buttonsColorDiv = document.querySelector('#buttons-color');
    const textColorDiv = document.querySelector('#text-color');

    //set css color variables
    root.style.setProperty("--bg-gradient-color", backgroundColorDiv.innerHTML);
    root.style.setProperty("--bg-mid-color", middleColorDiv.innerHTML);
    root.style.setProperty("--buttons-color", buttonsColorDiv.innerHTML);
    root.style.setProperty("--text-color", textColorDiv.innerHTML);

    //add colors to local storage    
    let bgSelectedValue = backgroundColorDiv.innerHTML;
    localStorage.setItem("bg-color", bgSelectedValue);

    let bgMidValue = middleColorDiv.innerHTML;
    localStorage.setItem("bg-middle", bgMidValue);

    let btnSelectedValue = buttonsColorDiv.innerHTML;
    localStorage.setItem("btn-color", btnSelectedValue);

    let txtSelectedValue = textColorDiv.innerHTML;
    localStorage.setItem("txt-color", txtSelectedValue);

    //retrieve colors from local storage for consistency
    storedBg = localStorage.getItem("bg-color");
    storedMid = localStorage.getItem("bg-middle");
    storedBtn = localStorage.getItem("btn-color");
    storedTxt = localStorage.getItem("txt-color");

    localStorage.setItem("Ai-flag", true);

    //call AI color function
    checkAndAssignColorsAI(storedBg, storedMid, storedBtn, storedTxt);
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

    localStorage.setItem("tomodoroDuration", tomodoroDuration);
    localStorage.setItem("shortBreakDuration", shortBreakDuration);
    localStorage.setItem("longBreakDuration", longBreakDuration);

    if (tomodoroTab.classList.contains('selected')) {                    
        timer.innerHTML = tomodoroDuration;
        setStartTime(tomodoroDuration);
    } else {
        switchToTomodoro();
    }

    //get the values from the dropdowns and store them in local storage
    let bgDropDown = document.querySelector('.dropdown-bg');
    const bgSelectedValue = bgDropDown.value;

    localStorage.setItem("bg-color", bgSelectedValue);

    let bgDropDown2 = document.querySelector('.dropdown-bg2');
    const bgMiddleValue = bgDropDown2.value;

    localStorage.setItem("bg-middle", bgMiddleValue);
    
    let btnDropDown = document.querySelector('.dropdown-btn');
    const btnSelectedValue = btnDropDown.value;

    localStorage.setItem("btn-color", btnSelectedValue);

    let txtDropDown = document.querySelector('.dropdown-txt');
    const txtSelectedValue = txtDropDown.value;

    localStorage.setItem("txt-color", txtSelectedValue);

    localStorage.setItem("Ai-flag", false);

    //Get current element colors from local storage so that the colors remain consistent everywhere
    const storedBg = localStorage.getItem("bg-color");
    const storedMid = localStorage.getItem("bg-middle");
    const storedBtn = localStorage.getItem("btn-color");
    const storedTxt = localStorage.getItem("txt-color");
    
    //assign color using function with parameters from above inputted
    checkAndAssignColors(storedBg, storedMid, storedBtn, storedTxt);

    //close pop up
    popUp.classList.remove("open");
});

//close pop up if user presses the close button on the top right
cancel.addEventListener('click', () => {
    popUp.classList.remove("open");
});

pickColors.addEventListener('click', () => {
    pickColors.style["pointer-events"] = "none";
})

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

    //Get current element colors from local storage so that the colors remain consistent everywhere
    const storedBg = localStorage.getItem("bg-color");
    const storedMid = localStorage.getItem("bg-middle");
    const storedBtn = localStorage.getItem("btn-color");
    const storedTxt = localStorage.getItem("txt-color");
    AiFlag = localStorage.getItem("Ai-flag");

    //assign color using function with parameters from above inputted
    if(AiFlag == "true") {
        checkAndAssignColorsAI(storedBg, storedMid, storedBtn, storedTxt);
    } else {
        checkAndAssignColors(storedBg, storedMid, storedBtn, storedTxt);
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

    //Get current element colors from local storage so that the colors remain consistent everywhere
    const storedBg = localStorage.getItem("bg-color");
    const storedMid = localStorage.getItem("bg-middle");
    const storedBtn = localStorage.getItem("btn-color");
    const storedTxt = localStorage.getItem("txt-color");
    AiFlag = localStorage.getItem("Ai-flag");

    //assign color using function with parameters from above inputted
    if(AiFlag == "true") {
        checkAndAssignColorsAI(storedBg, storedMid, storedBtn, storedTxt);
    } else {
        checkAndAssignColors(storedBg, storedMid, storedBtn, storedTxt);
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

    //Get current element colors from local storage so that the colors remain consistent everywhere
    const storedBg = localStorage.getItem("bg-color");
    const storedMid = localStorage.getItem("bg-middle");
    const storedBtn = localStorage.getItem("btn-color");
    const storedTxt = localStorage.getItem("txt-color");
    AiFlag = localStorage.getItem("Ai-flag");

    //assign color using function with parameters from above inputted
    if(AiFlag == "true") {
        checkAndAssignColorsAI(storedBg, storedMid, storedBtn, storedTxt);
    } else {
        checkAndAssignColors(storedBg, storedMid, storedBtn, storedTxt);
    }
}

async function typingEffect(element, text) {
    setTimeout(() => {
        element.textContent = text[0] + text[1];
    }, 0);

    let ch = 2;
    typeInterval = setInterval(() => {
        element.textContent += text[ch];
        ch += 1;
        if (ch == text.length) {
            clearInterval(typeInterval);
        }
    }, 200);
}

/* AI color function */
function checkAndAssignColorsAI(bgSelectedValueAI, bgSelectedMidAI, btnSelectedValueAI, txtSelectedValueAI) {
    const root = document.querySelector(':root');

    root.style.setProperty('--bg-gradient-color', bgSelectedValueAI);
    root.style.setProperty('--bg-mid-color', bgSelectedMidAI);
    root.style.setProperty('--buttons-color', btnSelectedValueAI);
    root.style.setProperty('--text-color', txtSelectedValueAI);

    document.body.style.backgroundImage = `linear-gradient(to right bottom, var(--bg-main-color), var(--bg-mid-color), var(--bg-gradient-color))`;
}

/* Dropdown Color Function */  
function checkAndAssignColors(bgSelectedValue, bgMidValue, btnSelectedValue, txtSelectedValue) {
    const root = document.querySelector(':root');

    const bgFormatted = "--" + bgSelectedValue;
    const midFormatted = "--" + bgMidValue;
    const btnFormatted = "--" + btnSelectedValue;
    const txtFormatted = "--" + txtSelectedValue;

    const bgColor = getComputedStyle(root).getPropertyValue(bgFormatted);
    const midColor = getComputedStyle(root).getPropertyValue(midFormatted);
    const btnColor = getComputedStyle(root).getPropertyValue(btnFormatted);
    const txtColor = getComputedStyle(root).getPropertyValue(txtFormatted);

    root.style.setProperty('--bg-gradient-color', bgColor);
    root.style.setProperty('--bg-mid-color', midColor);
    root.style.setProperty('--buttons-color', btnColor);
    root.style.setProperty('--text-color', txtColor);

    document.body.style.backgroundImage = `linear-gradient(to right bottom, var(--bg-main-color), var(--bg-mid-color), var(--bg-gradient-color))`;
}

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

/**
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

const menuToggle = document.querySelector('.menu-toggle');
const menuContent = document.querySelector('.menu-content');

menuToggle.addEventListener('click', () => {
menuContent.classList.toggle('show-menu');
});