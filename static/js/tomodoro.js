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

let typeInterval;

startButton.addEventListener('click', () => {
    clearInterval(typeInterval);
    runTimer();
});

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

    document.body.style.backgroundImage = `linear-gradient(to right bottom, var(--bg-main-color), var(--bg-main-color), var(--bg-gradient-color))`;
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

    /*Change background color according to what the user has selected in the background.*/
    let bgDropDown = document.querySelector('.dropdown-bg');
    const bgSelectedValue = bgDropDown.value;

    if(bgSelectedValue === "bg-red") {
        document.body.style.backgroundImage = `linear-gradient(to right bottom, var(--bg-main-color), var(--bg-main-color), var(--bg-red))`;
    } else if (bgSelectedValue === "bg-orange") {
        document.body.style.backgroundImage = `linear-gradient(to right bottom, var(--bg-main-color), var(--bg-main-color), var(--bg-orange))`;
    } else if (bgSelectedValue === "bg-yellow") {
        document.body.style.backgroundImage = `linear-gradient(to right bottom, var(--bg-main-color), var(--bg-main-color), var(--bg-yellow))`;
    } else if (bgSelectedValue === "bg-green") {
        document.body.style.backgroundImage = `linear-gradient(to right bottom, var(--bg-main-color), var(--bg-main-color), var(--bg-green))`;
    } else if (bgSelectedValue === "bg-light-blue") {
        document.body.style.backgroundImage = `linear-gradient(to right bottom, var(--bg-main-color), var(--bg-main-color), var(--bg-light-blue))`;
    } else if (bgSelectedValue === "bg-dark-blue") {
        document.body.style.backgroundImage = `linear-gradient(to right bottom, var(--bg-main-color), var(--bg-main-color), var(--bg-dark-blue))`;
    } else {
        document.body.style.backgroundImage = `linear-gradient(to right bottom, var(--bg-main-color), var(--bg-main-color), var(--bg-purple))`;
    }

    /*Change button color according to what the user has selected in the background.*/
    let btnDropDown = document.querySelector('.dropdown-btn');
    const btnSelectedValue = btnDropDown.value;

    const buttons = document.querySelectorAll('.tom-button');

    if(btnSelectedValue === "btn-red") {
        for (const button of buttons) {
            if(button.classList.contains('selected')){
            } else {
                button.style.setProperty("background-color", "var(--btn-red)");
            }
        }
    } else if (btnSelectedValue === "btn-orange") {
        for (const button of buttons) {
            if(button.classList.contains('selected')){
            } else {
                button.style.setProperty("background-color", "var(--btn-orange)");
            }
        }
    } else if (btnSelectedValue === "btn-yellow") {
        for (const button of buttons) {
            if(button.classList.contains('selected')) {
            } else {
                button.style.setProperty("background-color", "var(--btn-yellow)");
            }
        }
    } else if (btnSelectedValue === "btn-green") {
        for (const button of buttons) {
            if(button.classList.contains('selected')) {
            } else {
                button.style.setProperty("background-color", "var(--btn-green)");
            }
        }
    } else if (btnSelectedValue === "btn-light-blue") {
        for (const button of buttons) {
            if(button.classList.contains('selected')) {
            } else {
                button.style.setProperty("background-color", "var(--btn-light-blue)");
            }
            
        }
    } else if (btnSelectedValue === "btn-dark-blue") {
        for (const button of buttons) {
            if(button.classList.contains('selected')) {
            } else {
                button.style.setProperty("background-color", "var(--btn-dark-blue)");
                button.style.setProperty("box-shadow", "0 0 .3rem" + "var(--btn-dark-blue)");
            }
        }
    } else {
        for (const button of buttons) {
            if(button.classList.contains('selected')) {
            } else {
                button.style.setProperty("background-color", "var(--btn-purple)");
            }
        }
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



        setStartTime(tomodoroDuration);

        clearInterval(typeInterval);
        typingEffect(timer, tomodoroDuration);
    }



    document.body.style.backgroundImage = `linear-gradient(to right bottom, var(--bg-main-color), var(--bg-main-color), var(--bg-gradient-color))`;
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
    document.body.style.backgroundImage = `linear-gradient(to right bottom, var(--bg-main-color), var(--bg-main-color), var(--bg-gradient-color))`;
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
    document.body.style.backgroundImage = `linear-gradient(to right bottom, var(--bg-main-color), var(--bg-main-color), var(--bg-gradient-color))`;
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

//typing effect for whatever number is on screen when it loads
window.onload = () => {
    const timerElement = document.querySelector('.timer');
    typingEffect(timerElement, timerElement.innerHTML);
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
const allLinks = document.querySelectorAll('a');

allLinks.forEach(link => {
    link.addEventListener('click', (event) => {
    
        //stops link from just sending the user to the next page.
        event.preventDefault();

        //add everything below the menu bar and above the footer to the exit animation class list so the animation plays.
        const timerElements = document.getElementById('timer-div');
        timerElements.classList.add('exit');
  
        //delay after animation and send the user to the link
        setTimeout(() => {
            window.location.href = link.href;
        }, 500);
    });
  });