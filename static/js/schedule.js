document.getElementById('addEvent').addEventListener('click', function() {
    addEvent();
});

window.onload = function() {
    addEvent();
};

const addEvent = () => {
    var newEventContainer = document.createElement('div');
    newEventContainer.className = 'events-and-time-container';

    var newEventInput = document.createElement('input');
    newEventInput.type = 'text';
    newEventInput.name = 'events';
    newEventInput.className = 'input';
    newEventInput.required = true;

    var br1 = document.createElement('br');

    var newTimeSelect = document.createElement('select');
    newTimeSelect.name = 'time';
    newTimeSelect.className = 'input-select';
    newTimeSelect.required = true;

    var options = [
        { value: "0.25", text: "15 min" },
        { value: ".5", text: "30 min" },
        { value: ".75", text: "45 min" },
        { value: "1", text: "1 hr" },
        { value: "1.5", text: "1 hr 30 min" },
        { value: "2", text: "2 hr" },
        { value: "2.5", text: "2 hr 30 min" },
        { value: "3", text: "3 hr" },
        { value: "4", text: "4 hr" },
        { value: "5", text: "5 hr" },
        { value: "6", text: "6 hr" },
        { value: "7", text: "7 hr" },
        { value: "8+", text: "8+ hr" }
    ];

    options.forEach(function(option) {
        var newOption = document.createElement('option');
        newOption.value = option.value;
        newOption.text = option.text;
        newTimeSelect.appendChild(newOption);
    });

    var br2 = document.createElement('br');
    var br3 = document.createElement('br');

    newEventContainer.appendChild(newEventInput);
    newEventContainer.appendChild(br1);
    newEventContainer.appendChild(newTimeSelect);
    newEventContainer.appendChild(br2);
    newEventContainer.appendChild(br3);

    // Append the new container to the input container
    var inputContainer = document.querySelector('.input-container');
    inputContainer.insertBefore(newEventContainer, document.getElementById('addEvent'));
}