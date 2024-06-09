import textToSpeech from "./text-to-speech.js"; // TODO: Speak last paragraph of text from output

window.onload = () => {
    const storedInputs = JSON.parse(localStorage.getItem("sessionStore")) || [];
    const storedTimes = JSON.parse(localStorage.getItem("sessionStoreTimes")) || [];

    // Load stored inputs if they exist
    if (storedInputs.length > 0) {
        console.log("There are inputs");
        storedInputs.forEach((inputValue, index) => {
            addEvent({ event: inputValue, time: storedTimes[index] });
        });
    } else {
        addEvent();
    }
};

document.getElementById('addEvent').addEventListener('click', () => {
    addEvent();
});

const addEvent = (eventData = {}) => {
    const newEventContainer = document.createElement('div');
    newEventContainer.className = 'events-and-time-container';

    const newEventInput = document.createElement('input');

    newEventInput.type = 'text';
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
    inputContainer.insertBefore(newEventContainer, document.getElementById('addEvent'));
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

    localStorage.setItem("sessionStore", JSON.stringify(eventsArray));
    localStorage.setItem("sessionStoreTimes", JSON.stringify(eventTimesArray));
});