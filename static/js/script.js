const messages = ["Contentment is the greatest wealth.",
                                    "Paws for thought; reflection brings clarity.",
                                    "Hardships only sharpen your claws.",
                                    "In the purr-suit of knowledge, curiosity is your whiskers.",
                                    "Keep your focus sharp, like a cat hunting its prey.",
                                    "Live every single meowment with purr-pose.",
                                    "Chase your dreams like they're laser pointers.",
                                    "Like a cat with nine lives, you have countless opportunities for success!",
                                    "Resilience is your armor against the arrows of doubt.",
                                    "In the garden of meowledge, purr-sistence is the water that makes flowers bloom.",
                                    "Even in darkness, there is always a glimmer of hope!",
                                    "Success favors the purr-sistent.",
                                    "No matter how furstrating it gets, keep scratching at your goals.",
                                    "Believe in meowself, even when no one else does!",
                                    "Keep your whiskers sharp and your ambitions sharper.",
                                    "The only limit to your success is your purrception of your capabilities.",
                                    "Leap over obstacles like a cat over a fence.",
                                    "Build the ladder of success one paw at a time.",
                                    "Love for others what you love for meowself.",
                                    "Claw your way through hardships; surely, victory awaits.",
                                    "You're purrfectly capable of achieving your dreams!",
                                    "The only way to purr-dict the future is to create it.",
                                    "Don't let stress get your whiskers in a twist; you will get through it.",
                                    "Uncertainty is the spice that makes life exciting.",
                                    "Be kind to yourself; you're doing better than you think.",
                                    "Every meowment is a chance to start anew.",
                                    "Don't let fear leash your potential; unleash it!",
                                    "Cherish progress, no meowter how small.",
                                    "Even the mightiest lion relies on its pride; don't be afraid to ask for help.",
                                    "Success isn't a sprint; it's a meowrathon.",
                                    "Your purr-tential is limitless, like the expanse of the meowcean.",
                                    "Luck is where hard work meets meow-portunity.",
                                    "Every setback is like a hairball; unpleasant, but it will pass.",
                                    "Strive for progress, not purrfection.",
                                    "Even on the darkest nights, the stars still shine!",
                                    "Stay focused, stay determined, and success will be yours.",
                                    "Seize the day like the cat seizes the mouse — swiftly and decisively!",
                                    "Curiosity didn't kill the cat; it made me wiser.",
                                    "The best view comes after the hardest climb.",
                                    "Success is not meow-sured by wealth, but by the state of one’s heart and actions.",
                                    "Nap when you must, but never sleep on your dreams.",
                                    "Comparison is the thief of purr-sonal growth.",
                                    "Even the fiercest tiger started out as a tiny kitten.",
                                    "Your potential meows no bounds; let your aspurrations soar.",
                                    "Opportunities are like yarn; grab them and weave your destiny.",
                                    "Failure is the purr-tilizer for success.",
                                    "Let hope be your compass; it will guide you through the darkest alleys.",
                                    "I may have nine lives, but you only need one to make a difference.",
                                    "Pounce on opportunities like they're catnip.",
                                    "Even the smallest feline is a masterpiece.",
                                    "Life's litter box may be messy, but you've got this.",
                                    "In the game of life, always land on your feet.",
                                    "Meowmentum is key; keep moving forward.",
                                    "When life gives you lemons, sharpen your claws and make lemeownade.",
                                    "Keep your tail high and your spirits higher!",
                                    "Take challenges as meow-portunities.",
                                    "Even the fiercest lions need a catnap sometimes — remember to take care of yourself.",
                                    "Meow is the time to invest in your future!"];

const tomQuoteHead = document.getElementById('tom-quote-head');
tomQuoteHead.addEventListener("click", function() {
    let messageIndex = Math.floor(Math.random()*messages.length);
    const random = Math.random();
                        
    if (messageIndex >= messages.length - 1) {
        messageIndex = Math.floor(random * 3);
    } else if (random <= .34 || messageIndex >= messages.length - 2) {
        messageIndex++;
    } else if (random <= .67 || messageIndex >= messages.length - 3) {
        messageIndex += 2;
    } else {
        messageIndex += 3;
    }

    const para = document.querySelector('h1');
    para.innerHTML = messages[messageIndex];
    textToSpeech(messages[messageIndex]);
});

function textToSpeech(message) {
    const synth = window.speechSynthesis;
    const speakThis = new SpeechSynthesisUtterance(message);
    speakThis.lang = 'en';
    speakThis.pitch = .8;
    speakThis.rate = 1;
    synth.speak(speakThis);
}

const eventInput = document.getElementById("events");
const addEventButton = document.getElementById("addEvent");

eventInput.addEventListener("click", function() {
  // Enable the Add Event button on first click
  addEventButton.disabled = false;
});

addEventButton.addEventListener("click", function() {
  // Create a new text input element
  const newTextInput = document.createElement("input");
  newTextInput.type = "text";
  newTextInput.classList.add("input"); 
  // Consider adding a name or id for identification if needed

  // Append the new input after the current event input
  eventInput.parentNode.insertBefore(newTextInput, eventInput.nextSibling);

  // Clear the Add Event button click after adding the new input
  this.disabled = true;
});