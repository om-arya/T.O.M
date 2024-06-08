import textToSpeech from "./text-to-speech.js"; // TODO: Speak last paragraph of text from output

// Add a single event when the page loads
window.onload = () => {
    addEvent();
};

// Add additional events when the 'add event' button is clicked
document.getElementById('addEvent').addEventListener('click', () => {
    addEvent();
});

// Create a new event container and insert it into the input container above the 'add event' button
const addEvent = () => {
    const newEventContainer = document.createElement('div');
    newEventContainer.className = 'events-and-time-container';

    const newEventInput = document.createElement('input');
    newEventInput.type = 'text';
    newEventInput.name = 'event';
    newEventInput.className = 'input';
    newEventInput.required = true;

    const br1 = document.createElement('br');

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
    eventInputs.forEach(function(input) {
        eventsArray.push(input.value);
    });

    console.log(eventsArray);

    //store eventsArray in localStorage using sessionStore as the key and the eventsArray as the value
    //do we need new key/value pair for each user??
    localStorage.setItem("sessionStore", JSON.stringify(eventsArray));
});

window.onload = () => {
    //get stored inputs using the key sessionStore
    const storedInputs= JSON.parse(localStorage.getItem("sessionStore"));

    //if stored inputs exist, load them back into the input forms
    if(storedInputs){
        const eventInputs= document.querySelectorAll('.input');
        eventInputs.forEach(function(input){
            input.value= storedInputs;
        });
        //idk the syntax for this:
        // use a for each loop and loop through all values in the eventsArray. 
        // Load them back onto the inputs on the page the same way they were loaded onto the eventsArray, just in ResizeObserverSize.
        // eventInputs.forEach(function(input)){
            
        // }
    }
}