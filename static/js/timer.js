const timer = document.querySelector('.timer');
const startButton = document.querySelector('#start-timer');
const restartButton = document.querySelector('#restart-button');

let startTime = timer.innerHTML; // when the timer is stopped, we set it back to this
let interval; // stores the reference to our 'setInterval()' function for use in 'clearInterval()' call

/**
 * Used when switching tabs to update the initial time.
 * @param {str} time 
 */
function setStartTime(time) {
    startTime = time;
}

/**
 * Turn the start button into a pause button, enable the
 * restart button, and decrement the timer every second.
 */
function runTimer() {
    startButton.removeEventListener('click', runTimer);
    startButton.addEventListener('click', pauseTimer);

    restartButton.addEventListener('click', stopTimer);

    startButton.classList.add('pause-mode');
    startButton.classList.remove('start-mode');
    startButton.setAttribute('value', "Pause");

    timer.innerHTML = startTime;

    interval = setInterval(decrementSecond, 1000);
}

/**
 * Get the current values of the hours, minutes, and seconds,
 * and update the display with the time decremented by 1 second.
 * 
 * Stop decrementing when the time reaches 00:00.
 * 
 * If the hours are 0, we do not display them, but we always
 * display the minutes and seconds.
 */
function decrementSecond() {
    let currTime = timer.innerHTML;
    if (currTime === "00:00") {
        startButton.addEventListener('click', runTimer)
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
        } else if (minutes === 0 && hours > 0) {
                minutes = 59;
                hours -= 1;
        }
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
    if (startButton.getAttribute('value') === "Pause") {
        startButton.removeEventListener('click', pauseTimer);
        startButton.addEventListener('click', unpauseTimer);

        clearInterval(interval);

        startButton.classList.add('start-mode');
        startButton.classList.remove('pause-mode');
        startButton.setAttribute('value', "Start Timer");
    }
}

/**
 * Unpause the timer and turn the unpause button into
 * a pause button.
 */
function unpauseTimer() {
    if (startButton.getAttribute('value') === "Start Timer") {
        startButton.removeEventListener('click', unpauseTimer);
        startButton.addEventListener('click', pauseTimer);

        clearInterval(interval);
        interval = setInterval(decrementSecond, 1000);

        startButton.classList.add('pause-mode');
        startButton.classList.remove('start-mode');
        startButton.setAttribute('value', "Pause");
    }
}

/**
 * Stop the timer completely, resetting the time to what it
 * was initially. Revert the start button back to normal
 * and disable the restart button.
 */
function stopTimer() {
    restartButton.removeEventListener('click', stopTimer);

    startButton.removeEventListener('click', pauseTimer);
    startButton.removeEventListener('click', unpauseTimer);
    startButton.addEventListener('click', runTimer);

    startButton.classList.add('start-mode');
    startButton.classList.remove('pause-mode');
    startButton.setAttribute('value', "Start Timer");

    clearInterval(interval);

    timer.innerHTML = startTime;
}

export {setStartTime, runTimer, stopTimer};