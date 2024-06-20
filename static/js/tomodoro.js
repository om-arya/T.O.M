const timer = document.querySelector('.timer');

let startTime = timer.innerHTML; // when the timer is stopped, we set it back to this
let interval; // stores the reference to our 'setInterval()' function for use in 'clearInterval()' call

timer.addEventListener('click', runTimer)

/**
 * Start the timer. Every second, get the current values of
 * the hours, minutes, and seconds, and update the display
 * with the time decremented by 1 second.
 * 
 * Stop decrementing when the time reaches 00:00.
 * 
 * If the hours are 0, we do not display them, but we always
 * display the minutes and seconds.
 */
function runTimer() {
    timer.removeEventListener('click', runTimer);
    timer.addEventListener('click', stopTimer);

    timer.innerHTML = startTime;

    interval = setInterval(() => {
        let currTime = timer.innerHTML;
        if (currTime === "00:00") {
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
    }, 1000);
}

/**
 * Stop the timer, resetting the time to what it was
 * initially.
 */
function stopTimer() {
    timer.removeEventListener('click', stopTimer);
    timer.addEventListener('click', runTimer);

    clearInterval(interval);

    timer.innerHTML = startTime;
}