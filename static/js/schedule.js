import textToSpeech from "./text-to-speech.js";

window.onload = () => {
    // Get stored input boxes using the key sessionStore
    const storedInputs = JSON.parse(localStorage.getItem("sessionStore")) || [];
    const storedTimes = JSON.parse(localStorage.getItem("sessionStoreTimes")) || [];

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

document.getElementById('deleteEvent').addEventListener('click', () => {
    deleteEvent();
});

// Create a new event container and insert it into the input container above the 'add event' button
const addEvent = (eventData = {}) => {
    const newEventContainer = document.createElement('div');
    newEventContainer.className = 'events-and-time-container';

    const newEventInput = document.createElement('input');
    newEventInput.type = 'text';
    newEventInput.name = 'event';
    newEventInput.className = 'input';
    newEventInput.required = true;
    newEventInput.value = eventData.event || ''; // Set value from eventData

    const newTimeSelect = document.createElement('select');
    newTimeSelect.name = 'time';
    newTimeSelect.className = 'input-select';
    newTimeSelect.required = true;

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
        newTimeSelect.appendChild(newOption);
    });

    if (eventData.time) {
        newTimeSelect.value = eventData.time;
    }

    const br1 = document.createElement('br');
    const br2 = document.createElement('br');
    const br3 = document.createElement('br');

    newEventContainer.appendChild(newEventInput);
    newEventContainer.appendChild(br1);
    newEventContainer.appendChild(newTimeSelect);
    newEventContainer.appendChild(br2);
    newEventContainer.appendChild(br3);

    const inputContainer = document.getElementsByClassName('input-container')[0];
    inputContainer.insertBefore(newEventContainer, document.getElementsByClassName('add-delete-container')[0]);
}

const deleteEvent = () => {
    const eventContainers = document.getElementsByClassName('events-and-time-container');
    const lastEventContainer = eventContainers[eventContainers.length - 1];
    lastEventContainer.remove();
}

document.getElementById('scheduleForm').addEventListener('submit', function() {
    const eventInputs = document.querySelectorAll('.input');
    const eventTimes = document.querySelectorAll('.input-select');

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
    localStorage.setItem("eventCount", JSON.stringify(eventCount));

});

const button = document.getElementsByClassName('submit-container')[0];
button.addEventListener("click", function() {
    const speech = document.getElementById('result'); //need to figure out how to make this a string
    // const para = document.querySelector('pre');
    // para.innerHTML = speech;
    textToSpeech(speech);
});