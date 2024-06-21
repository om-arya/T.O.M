import {textToSpeech} from "./text-to-speech.js";

window.onload = () => {
    // We maintain these through reloads and session closes (exiting the tab keeps these)
    const storedInputs = JSON.parse(localStorage.getItem("inputs")) || [];
    const storedTimes = JSON.parse(localStorage.getItem("times")) || [];
    const storedSchedule = localStorage.getItem("schedule");
    const storedNotes = localStorage.getItem("notes");

    const notes = document.querySelector('.notes');
    const result = document.querySelector('#result');

    // Scroll to the schedule result when it loads
    if (result.innerHTML.length > 15) {
        // Wait for the DOM to update for the offset to be accurate
        setTimeout(() => { 
            window.scrollTo({
                top: result.offsetTop - 20,
                left: 0,
                behavior: "smooth",
            });
        }, 0);
    }

    // If stored input boxes exist, load them back onto the page
    if (storedInputs.length > 0) {
        storedInputs.forEach((inputValue, index) => {
            addEvent({ event: inputValue, time: storedTimes[index] });
        });
    } else {
        addEvent();
    }

    // Load additional notes
    notes.innerHTML = storedNotes;

    // Load stored schedule if non-empty
    if (storedSchedule.includes('Y')) {
        result.innerHTML = storedSchedule;
    }
};

// Add additional events when the 'add event' button is clicked
document.getElementById('addEvent').addEventListener('click', () => {
    addEvent();
});

//delete all events when 'clear all' button is clicked
document.getElementById('clearEvents').addEventListener('click', () => {
    clearEvents();
});

function clearEvents() {
    //select all event boxes on the page
    const allEvents = document.querySelectorAll('.events-and-time-container');

    //if there are event boxes, delete them all with a for each loop
    if (allEvents) {
        allEvents.forEach(event => {
            event.remove();
        });
    }
    addEvent();
}

// Create a new event container and insert it into the input container above the 'add event' button
const addEvent = (eventData = {}) => {
    const eventContainer = document.createElement('div');
    eventContainer.className = 'events-and-time-container';

    const eventInput = document.createElement('input');
    eventInput.type = 'text';
    eventInput.name = 'event';
    eventInput.className = 'input';
    eventInput.required = true;
    eventInput.value = eventData.event || '';

    const timeSelect = document.createElement('select');
    timeSelect.name = 'time';
    timeSelect.className = 'input-select';
    timeSelect.required = true;

    const options = [
        { value: "15 minutes", text: "15 min" },
        { value: "30 minutes", text: "30 min" },
        { value: "45 minutes", text: "45 min" },
        { value: "1 hour", text: "1 hr" },
        { value: "1 hour and 30 minutes", text: "1 hr 30 min" },
        { value: "2 hours", text: "2 hr" },
        { value: "2 hours and 30 minutes", text: "2 hr 30 min" },
        { value: "3 hours", text: "3 hr" },
        { value: "4 hours", text: "4 hr" },
        { value: "5 hours", text: "5 hr" },
        { value: "6 hours", text: "6 hr" },
        { value: "7 hours", text: "7 hr" },
        { value: "8 hours or more", text: "8+ hr" }
    ];

    options.forEach((option) => {
        const newOption = document.createElement('option');
        newOption.value = option.value;
        newOption.text = option.text;
        timeSelect.appendChild(newOption);
    });

    if (eventData.time) {
        timeSelect.value = eventData.time;
    }

    eventContainer.appendChild(eventInput);
    eventContainer.appendChild(timeSelect);

    const size = document.querySelectorAll('.events-and-time-container').length;
    // Start adding delete buttons after the first event
    if(size > 0) {
        const deleteButton = document.createElement('button');
        deleteButton.name = 'delete';
        deleteButton.type = 'button';
        deleteButton.id = 'deleteEvent';
        deleteButton.className = 'delete-button';
        deleteButton.textContent = ' X ';
        eventContainer.appendChild(deleteButton);

        deleteButton.addEventListener('click', () => {
            eventContainer.remove();
        });
    }

    const inputContainer = document.getElementsByClassName('input-container')[0];
    inputContainer.insertBefore(eventContainer, document.getElementsByClassName('add-delete-container')[0]);
}

// Store inputs, times, and additional notes
document.getElementById('scheduleForm').addEventListener('submit', function() {
    localStorage.clear();

    const eventInputs = document.querySelectorAll('.input');
    const eventTimes = document.querySelectorAll('.input-select');
    const additionalNotes = document.querySelector('.notes').value;
    
    const eventsArray = [];
    eventInputs.forEach(function(input) {
        eventsArray.push(input.value);
    });

    const eventTimesArray = [];
    eventTimes.forEach(function(time) {
        eventTimesArray.push(time.value);
    })

    localStorage.setItem("inputs", JSON.stringify(eventsArray));
    localStorage.setItem("times", JSON.stringify(eventTimesArray));
    localStorage.setItem("notes", additionalNotes);
});

const sleep = ms => new Promise(res => setTimeout(res, ms)); // pause the program for 'ms' milliseconds

const submitContainer = document.getElementsByClassName('submit-container')[0];
submitContainer.addEventListener("click", speechAndStorage()); 

// Store the full schedule in local storage and speak just the 'words of advice'
async function speechAndStorage(){
    let schedule = document.getElementById('result').innerHTML;

    // Wait for the schedule to load
    while (!schedule.includes('Y')) {
        await sleep(200);
    }

    localStorage.setItem("schedule", schedule);

    const index = schedule.indexOf("Remember these words of advice");
    if (index >= 0) {
        // Read just the 'words of advice' substring with no tags
        schedule = schedule.substring(index);
        schedule = schedule.replaceAll("<p>", "").replaceAll("</p>", "").replaceAll("<strong>", "").replaceAll("</strong>", "");
        textToSpeech(schedule);
    }
}