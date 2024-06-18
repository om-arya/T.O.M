import {textToSpeech} from "./text-to-speech.js";

window.onload = () => {
    // Get stored input boxes using the key sessionStore
    const storedInputs = JSON.parse(localStorage.getItem("sessionStore")) || [];
    const storedTimes = JSON.parse(localStorage.getItem("sessionStoreTimes")) || [];
    const aiResult = localStorage.getItem("schedule");
    const additionalNotes = localStorage.getItem("notes");

    const result = document.querySelector('#result');
    if (result.innerHTML.length > 15) { // scroll to schedule result when it loads
        setTimeout(() => {
            window.scrollTo({
                top: result.offsetTop - 20,
                left: 0,
                behavior: "smooth",
            });
        }, 0);
    }

    console.log(storedInputs);
    document.querySelector('.notes').innerHTML = additionalNotes;
    document.getElementById('result').innerHTML = aiResult;

    // If stored input boxes exist, load them back onto the page
    if (storedInputs.length > 0) {
        console.log("There are inputs");
        storedInputs.forEach((inputValue, index) => {
            addEvent({ event: inputValue, time: storedTimes[index] });
        });
    } else {
        addEvent();
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
    if(allEvents) {
        allEvents.forEach(event => {
            event.remove();
        });
    }

    //clear local storage of any inputs
    localStorage.clear();

    //add a blank event back to the page
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
    if(size > 0){
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

document.getElementById('scheduleForm').addEventListener('submit', function() {
    localStorage.clear();

    const eventInputs = document.querySelectorAll('.input');
    const eventTimes = document.querySelectorAll('.input-select');
    const extraNotes = document.querySelector('.notes').value;

    console.log(extraNotes);
    
    const eventsArray = [];
    eventInputs.forEach(function(input) {
        eventsArray.push(input.value);
    });

    const eventTimesArray = [];
    eventTimes.forEach(function(time) {
        eventTimesArray.push(time.value);
    })

    console.log(eventsArray);
    console.log(eventTimesArray);

    // Store eventsArray in localStorage using sessionStore as the key and the eventsArray as the value
    localStorage.setItem("sessionStore", JSON.stringify(eventsArray));
    localStorage.setItem("sessionStoreTimes", JSON.stringify(eventTimesArray));
    localStorage.setItem("notes", extraNotes);
});

const button = document.getElementsByClassName('submit-container')[0];
button.addEventListener("click", speechAndStorage()); 

function speechAndStorage(){
    var schedule = document.getElementById('result').innerHTML;
    if(schedule.length == 13){ //unitialized length of result
        speechAndStorage(); //recursively call until correct string is loaded
    } else {
        localStorage.setItem("schedule", schedule);
        const index = schedule.indexOf("Remember these words of advice");
        if(index >= 0){
            schedule = schedule.substring(index);
        }
        console.log(schedule);
        console.log(schedule.length);
        textToSpeech(schedule);
    }
}