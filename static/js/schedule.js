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

        /*If a schedule exists in local storage (concurrently happens to stored input boxes existing, and implying that the user has already created a schedule), 
        load in text that prompts user to click Tom again to make a new schedule.*/
        const textElement = document.getElementById('press-me-text');
        const newTextContent = 'Click me again to make a new schedule!';

        //Call typingEffect() on the new text to display it on the page.
        typingEffect(textElement, newTextContent);
    } else {
        addEvent();

        /*If no schedule exists in local storage (implying the user has yet to make their first schedule), 
        load in the default text from the HTML that prompts user to click on Tom to make their first schedule. */
        const textElement= document.getElementById('press-me-text');
        const newTextContent = textElement.textContent;

        //Call typingEffect() on the text to display it on the page.
        typingEffect(textElement, newTextContent);
    }

    
    // Load additional notes
    notes.innerHTML = storedNotes;

    // Load stored schedule if non-empty
    if (storedSchedule.includes('Y')) {
        result.innerHTML = storedSchedule;
    }

    typingEffect()
    
};

//one observer to create animations for the text boxes to come in from the bottom
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
    });
})

const hiddenElements = document.querySelectorAll(".hidden");
hiddenElements.forEach((el) => observer.observe(el));


//second observer to create animations for Tom which is to come in from the right
const observer2 = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show2');
        } else {
            entry.target.classList.remove('show2');
        }
    });
})

const hiddenElements2 = document.querySelectorAll(".hidden2");
hiddenElements2.forEach((el) => observer2.observe(el));

// Add additional events when the 'add event' button is clicked
document.getElementById('addEvent').addEventListener('click', () => {
    addEvent();
});

//delete all events when 'clear all' button is clicked
document.getElementById('clearEvents').addEventListener('click', () => {
    //remove all individual events from the page
    clearEvents();

    //remove all additional notes from the page
    const additionalNotes = document.querySelectorAll('.notes');
    additionalNotes.textContent = '';

    //remove the old existing schedule from the page
    const existingSchedule = document.getElementById('result');
    existingSchedule.textContent = '';
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
    
    const additionalNotes = document.querySelectorAll('.notes');
    additionalNotes.textContent = '';

    localStorage.clear();

    addEvent();
}

// Create a new event container and insert it into the input container above the 'add event' button
const addEvent = (eventData = {}) => {
    const eventContainer = document.createElement('div');
    //add the new eventContainer to the hidden class in order to have it be animated when added to the screen
    eventContainer.classList.add('events-and-time-container', 'hidden');
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

        //code for event container animation
        setTimeout(() => {
            /*add the eventContainer to the class list named visible after removing it from the class list named hidden. 
            There is an animation for transitioning between the two classes that allows the element to show up on screen with a transtion.*/
            eventContainer.classList.remove('hidden');
            eventContainer.classList.add('visible');
          });

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

    /*Between when the user has clicked the button and before the schedule is loaded onto the page (marked by a reload of the page), 
    change the text under Tom to be loading text.*/
    const textElement= document.getElementById('press-me-text');
    const newTextContent = 'Meow! Planning your day out...';

    //Call typingEffect() on the new text to display it on the page.
    typingEffect(textElement, newTextContent);
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

//typing effect function, identical to the one in quotes
function typingEffect(element, text, i = 0){
    if (i === 0) {
        element.textContent = "";
    }
    if (i < text.length) {
        element.textContent += text.charAt(i);
        setTimeout(() => typingEffect(element, text, i + 1), 50);
    }
}