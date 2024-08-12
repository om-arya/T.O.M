const timer = document.querySelector('.timer');
const mainStartButton = document.querySelector('#start-timer');
const startButtons = document.querySelectorAll('#start-timer, .tom-image img');
const restartButton = document.querySelector('#restart-button');
const body = document.querySelector('body');

let startTime = timer.innerHTML; // when the timer is stopped, we set it back to this
let interval; // stores the reference to our 'setInterval()' function for use in 'clearInterval()' call

const sleep = ms => new Promise(res => setTimeout(res, ms));

/**
 * Used when switching tabs to update the initial time.
 * @param {str} time 
 */
function setStartTime(time) {
    const timeParts = time.split(':');
    if (timeParts.length >= 3) {
        const hours = timeParts[0];
        if (hours >= 100) {
            timer.style["font-size"] = "12rem";
        } else {
            timer.style["font-size"] = "13rem";
        }
    } else {
        timer.style["font-size"] = "15rem";
    }
    
    startTime = time;
}

/**
 * Turn the start button into a pause button, enable the
 * restart button, and decrement the timer every second.
 */
function runTimer() {
    if (mainStartButton.getAttribute('value') === "Pause") {
        pauseTimer();
        return;
    }

    startButtons.forEach((startButton) => {
        startButton.removeEventListener('click', runTimer);
        startButton.addEventListener('click', pauseTimer);
    });
    restartButton.addEventListener('click', stopTimer);

    mainStartButton.classList.add('pause-mode');
    mainStartButton.classList.remove('start-mode');
    mainStartButton.setAttribute('value', "Pause");

    interval = setInterval(decrementSecond, 1000);
}

/**
 * Get the current values of the hours, minutes, and seconds,
 * and update the display with the time decremented by 1 second.
 * 
 * Stop decrementing when the time reaches 00:00.
 * 
 * If there are hours, shrink the font size of the timer.
 * If the hours are 0, we do not display them, but we always
 * display the minutes and seconds.
 */
function decrementSecond() {
    let currTime = timer.innerHTML;
    if (currTime === "00:00") {
        // Change screen color and play alarm until either
        // the restart button or the start button is clicked.
        body.style["background"] = "linear-gradient(to right bottom, white, red, red)";
        playAlarm();

        startButtons.forEach((startButton) => {
            startButton.addEventListener('click', stopTimer);
        });
        mainStartButton.setAttribute('value', "Restart");

        clearInterval(interval);
        return;
    }

    const timeParts = currTime.split(':');
    let hours = 0, minutes = 0, seconds = 0;

    if (timeParts.length >= 3) {
        hours = parseInt(timeParts[0]);
        minutes = parseInt(timeParts[1]);
        seconds = parseInt(timeParts[2]);
    } else {
        minutes = parseInt(timeParts[0]);
        seconds = parseInt(timeParts[1]);
    }
    
    if (seconds > 0) {
        seconds -= 1;
    } else {
        if (minutes > 0) {
            seconds = 59;
            minutes -= 1;
        } else if (hours > 0) {
                minutes = 59;
                seconds = 59;
                hours -= 1;
        }
    }

    if (hours >= 100) {
        timer.style["font-size"] = "12rem";
    } else if (hours > 0) {
        timer.style["font-size"] = "13rem";
    } else {
        timer.style["font-size"] = "15rem";
    }

    let hours_str = hours > 0 ? (hours < 10 ? `0${hours}:` : `${hours}:`) : '';
    let minutes_str = minutes < 10 ? `0${minutes}:` : `${minutes}:`;
    let seconds_str = seconds < 10 ? `0${seconds}` : `${seconds}`;

    timer.innerHTML = hours_str + minutes_str + seconds_str;
}

/**
 * Temporarily stop the timer and turn the pause button into
 * an unpause button.
 */
function pauseTimer() {
        startButtons.forEach((startButton) => {
            startButton.removeEventListener('click', pauseTimer);
            startButton.addEventListener('click', runTimer);
        });
        clearInterval(interval);
        
        mainStartButton.classList.add('start-mode');
        mainStartButton.classList.remove('pause-mode');
        mainStartButton.setAttribute('value', "Continue");
}

/**
 * Stop the timer completely, resetting the time to what it
 * was initially. Revert the start button back to normal
 * and disable the restart button.
 * 
 * Can be called by the restart button, or the start button
 * when the time is at 00:00.
 */
function stopTimer() {
    body.style["background-image"] = "linear-gradient(to right bottom, white, var(--bg-mid-color), var(--bg-gradient-color))";

    restartButton.removeEventListener('click', stopTimer);
    startButtons.forEach((startButton) => {
        startButton.removeEventListener('click', stopTimer);
        startButton.removeEventListener('click', pauseTimer);
        startButton.addEventListener('click', runTimer);
    });

    mainStartButton.classList.add('start-mode');
    mainStartButton.classList.remove('pause-mode');
    mainStartButton.setAttribute('value', "Start Timer");

    clearInterval(interval);
    resetTime();
}

/**
 * Reset the time of the timer to startTime.
 */
function resetTime() {
    const timeParts = startTime.split(':');
    if (timeParts.length >= 3) {
        const hours = timeParts[0];
        if (hours >= 100) {
            timer.style["font-size"] = "12rem";
        } else if (hours > 0) {
            timer.style["font-size"] = "13rem";
        } else {
            timer.style["font-size"] = "15rem";
        }
    }

    timer.innerHTML = startTime;
}

const catSound = new Audio("media/cat-sound.mp3");

/**
 * Meow meow, meow, meow, meow, meow
 */
async function playAlarm() {
    const BPM = 163;
    const quarterNoteDuration = (60 / BPM) * 1000;
    const halfNoteDuration = quarterNoteDuration * 2;

    while (timer.innerHTML == "00:00") {
        catSound.volume = 1;
        catSound.currentTime = 0;
        catSound.play();
        await sleep(quarterNoteDuration);
        catSound.volume -= .1;

        for (let i = 0; i < 4 && timer.innerHTML == "00:00"; i++) {
            catSound.currentTime = 0;
            catSound.play();
            await sleep(halfNoteDuration);
            catSound.volume -= catSound.volume / 1.5;
        }

        catSound.currentTime = 0;
        catSound.play();
        await sleep(quarterNoteDuration);
    }
}

export {setStartTime, runTimer, stopTimer};