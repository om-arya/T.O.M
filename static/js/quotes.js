import { textToSpeech, cancelTTS } from "./text-to-speech.js";

const preMadeQuotes = ["Contentment is the greatest wealth.",
                                    "Paws for thought; reflection brings clarity.",
                                    "Hardships only sharpen your claws.",
                                    "In the purr-suit of knowledge, curiosity is your whiskers.",
                                    "Keep your focus sharp, like a cat hunting its prey.",
                                    "Live every single meowment with purr-pose.",
                                    "Chase your dreams like they're laser pointers.",
                                    "Like a cat with nine lives, you have countless opportunities for success!",
                                    "Resilience is your armor against the arrows of doubt.",
                                    "In the garden of meowledge, purr-sistence is the water that makes flowers bloom.",
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
                                    "Success isn't a sprint; it's a meowrathon.",
                                    "Your purr-tential is limitless, like the expanse of the meowcean.",
                                    "Luck is where hard work meets meow-portunity.",
                                    "Every setback is like a hairball; unpleasant, but it will pass.",
                                    "Strive for progress, not purrfection.",
                                    "Stay focused, stay determined, and success will be yours.",
                                    "Seize the day like the cat seizes the mouse — swiftly and decisively!",
                                    "Curiosity didn't kill the cat; it made me wiser.",
                                    "The best view comes after the hardest climb.",
                                    "Be a cat who chases its dreams, not its tail.",
                                    "Nap when you must, but never sleep on your dreams.",
                                    "Comparison is the thief of purr-sonal growth.",
                                    "Your potential meows no bounds; let your aspurrations soar.",
                                    "Opportunities are like yarn; grab them and weave your destiny.",
                                    "Failure is the purr-tilizer for success.",
                                    "Let hope be your compass; it will guide you through the darkest alleys.",
                                    "I may have nine lives, but you only need one to make a difference.",
                                    "Pounce on opportunities like they're catnip.",
                                    "Life's litter box may be messy, but you've got this.",
                                    "In the game of life, always land on your feet.",
                                    "Meowmentum is key; keep moving forward.",
                                    "When life gives you lemons, sharpen your claws and make lemeownade.",
                                    "Keep your tail high and your spirits higher!",
                                    "Take challenges as meow-portunities.",
                                    "Meow is the time to invest in your future!"];

//create variables for the containers and buttons
const tomQuoteHead = document.querySelector('.tom-quote-head');
const quoteContainer = document.querySelector('.quote-container');
const quoteContent = quoteContainer.querySelector('.quote-content');
const aiQuotesContent = quoteContainer.querySelector('.ai-quotes-content');

// The page is reloaded whenever 'tomQuoteHead' is clicked
// We store these in sessionStorage to maintain them through page reloads:
let quoteCount = parseInt(sessionStorage.getItem('quoteCount')) || 0;
let quoteIndex = parseInt(sessionStorage.getItem('quoteIndex')) || Math.floor(Math.random() * preMadeQuotes.length);
let aiQuoteStack = JSON.parse(sessionStorage.getItem('aiQuoteStack')) || [];

// Reset sessionStorage when another tab is clicked
const navLinks = document.querySelector('.nav-items').querySelectorAll('a');
navLinks.forEach((link) => {
    link.addEventListener('click', () => {
        sessionStorage.clear();
    });
});

/**
 * Clicking 'tomQuoteHead' always displays and reads a new quote.
 * 
 * It also generates a new Django view, reloading the page.
 * 
 * 50% chance for a pre-made quote, 50% chance for an AI-generated
 * quote from 'aiQuoteStack' if non-empty.
 */

tomQuoteHead.addEventListener('click', () => {
    tomQuoteHead.style["pointer-events"] = "none";
    quoteCount++;
    sessionStorage.setItem('quoteCount', quoteCount);
})

/**
 * See 'views.py': The 'onclick' of 'tomQuoteHead' usually just reloads 'quotes.html' via 'quotes_view';
 *                 When 'aiQuoteStack' reaches a length of 1, in addition to reloading the page, we also
 *                 generate a new batch of 5 quotes via 'generate_ai_quotes'.
 */

if (aiQuoteStack.length < 2 && window.location.pathname === '/quotes+generate_ai_quotes+False') {
    /**
     * Set up the next click such that the invisible 'aiQuotesContent' div
     * will receive a new batch of AI-generated quotes via Django.
     * On failure, the page is simply reloaded, and no quotes are received.
     */
    tomQuoteHead.setAttribute('onclick', "location.href='quotes+generate_ai_quotes+True'");
} else {
    // Check for AI-generated quotes and reset the click link to the normal Django view
    if (aiQuoteStack.length < 2) { // AI-generated quotes were requested
        let newQuotes = aiQuotesContent.innerHTML;
        // Parse the 5 quotes in 'aiQuotesContent'
        // We filter out empty strings and '\n's
        newQuotes = newQuotes.split('*').slice(1).filter(quote => quote.length > 2);

        aiQuoteStack.push(...newQuotes);
        sessionStorage.setItem('aiQuoteStack', JSON.stringify(aiQuoteStack));
    }

    tomQuoteHead.setAttribute('onclick', "location.href='quotes+generate_ai_quotes+False'");
}

let typeInterval;

// Use a pre-made quote, or a 50% chance for an AI-generated quote if we have any stored
if (quoteCount == 0) {
    const clickMeMessage = "Click me for some pawsitive inspiration!";
    quoteContent.textContent = clickMeMessage;

    cancelTTS();
    textToSpeech(clickMeMessage);

    typingEffect(quoteContent, quoteContent.textContent);

} else if (aiQuoteStack.length === 0) { // pre-made quote
    cancelTTS();

    usePreMadeQuote();
} else { // pre-made quote or AI-generated quote
    cancelTTS();

    const randomHalf = Math.random();
    if (randomHalf < .5) {
        usePreMadeQuote();
    } else {
        useAIQuote();
    }
}

/**
 * Always called when 'aiQuoteStack' is empty; called 50% of the time when it is not.
 */
function usePreMadeQuote() {
    const randomThird = Math.random();

    // Increment 1, 2, or 3 quotes based on 'randomThird' value
    if (quoteIndex >= preMadeQuotes.length - 1) {
        quoteIndex = Math.floor(randomThird * 3);
    } else if (randomThird <= .34 || quoteIndex >= preMadeQuotes.length - 2) {
        quoteIndex++;
    } else if (randomThird <= .67 || quoteIndex >= preMadeQuotes.length - 3) {
        quoteIndex += 2;
    } else {
        quoteIndex += 3;
    }

    const currQuote = preMadeQuotes[quoteIndex];

    textToSpeech(currQuote);

    clearInterval(typeInterval);
    typingEffect(quoteContent, currQuote);

    sessionStorage.setItem('quoteIndex', quoteIndex);
}

/**
 * Called 50% of the time when 'aiQuoteStack' is not empty.
 */
function useAIQuote() {
    const currQuote = aiQuoteStack.pop();

    textToSpeech(currQuote);

    clearInterval(typeInterval);
    typingEffect(quoteContent, currQuote);

    sessionStorage.setItem('aiQuoteStack', JSON.stringify(aiQuoteStack));
}

/* ANIMATIONS */

//one observer to create animations for the quote container to come in from the bottom
const observerInput = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        entry.target.classList.add('show-quotes');
        //stop observing after the animation plays once so that it doesn't replay everytime the user scrolls up
        observerInput.unobserve(entry.target);
        
    });
})

const hiddenElementsInput = document.querySelectorAll(".hidden-quotes");
hiddenElementsInput.forEach((el) => observerInput.observe(el));

//second observer to create animations for Tom which is to come in from the right
const observerTom = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        entry.target.classList.add('show-tom');
        //stop observing after the animation plays once so that it doesn't replay everytime the user scrolls up
        observerTom.unobserve(entry.target);
    });
})

const hiddenElementsTom = document.querySelectorAll(".hidden-tom");
hiddenElementsTom.forEach((el) => observerTom.observe(el));

async function typingEffect(element, text) {
    setTimeout(() => {
        tomQuoteHead.style["pointer-events"] = "none";
        element.textContent = "";
    }, 0);

    let ch = 0;
    typeInterval = setInterval(() => {
        element.textContent += text[ch];
        ch += 1;
        if (ch == text.length) {
            clearInterval(typeInterval);
            tomQuoteHead.style["pointer-events"] = "all";
        }
    }, 35);
}


/**
 * EXIT ANIMATION CODE: We first select all the a href tags on the page- these are only used to lead away from the page itself
 * so page functionality isn't impacted. We then add an event listener for these links, and if any of them is clicked, we call 
 * preventDefault() to prevent them from directly sending the user to the next page. We then put all the elements we want to have disappear 
 * (in this case everything but the menu bar and footer) on the exit-animation classlist, which makes them fade into opacity 0. After that, 
 * the link directs the user to the page containing the link.
 */
const allLinks = document.querySelectorAll('.nav-items a');

allLinks.forEach(link => {
    if(!link.classList.contains('small-menu-link')) {
        link.addEventListener('click', (event) => {

            //stops link from just sending the user to the next page.
            event.preventDefault();

            //add everything below the menu bar and above the footer to the exit animation class list so the animation plays.
            const formElements = document.getElementById('tom-container');
            formElements.classList.add('exit');

            //delay after animation and send the user to the link
            setTimeout(() => {
                window.location.href = link.href;
            }, 500);
        });
    }
  });

document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('.icon').addEventListener('click', function () {
        var x = document.getElementById('navbar');
        if (x.className === 'nav-items') {
            x.className += ' responsive';
        } else {
            x.className = 'nav-items';
        }
    });
});