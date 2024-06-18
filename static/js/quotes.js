import {textToSpeech, cancelTTS} from "./text-to-speech.js";

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

const tomQuoteHead = document.querySelector('.tom-quote-head');
const quoteContainer = document.querySelector('.quote-container');
const quoteContent = quoteContainer.querySelector('.quote-content');
const aiQuotesContent = quoteContainer.querySelector('.ai-quotes-content');

// The page is reloaded whenever 'tomQuoteHead' is clicked
// We store these in sessionStorage to maintain them through page reloads
let quoteCount = parseInt(sessionStorage.getItem('quoteCount')) || 1;
let quoteIndex = parseInt(sessionStorage.getItem('quoteIndex')) || Math.floor(Math.random() * preMadeQuotes.length);
let aiQuoteStack = JSON.parse(sessionStorage.getItem('aiQuoteStack')) || [];

/**
 * Clicking 'tomQuoteHead' always displays and reads a new quote.
 * 
 * 50% chance for a pre-made quote, 50% chance for an AI-generated
 * quote from 'aiQuoteStack' if non-empty.
 * 
 * It also generates a new Django view, reloading the page.
 */

tomQuoteHead.addEventListener('click', () => {
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

// Use a pre-made quote, or potentially an AI-generated quote if we have any stored
if (aiQuoteStack.length === 0) { // pre-made quote
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
 * Always called when 'aiQuoteStack' is empty; sometimes called when it is not.
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

    sessionStorage.setItem('quoteIndex', quoteIndex);

    quoteContent.innerHTML = currQuote;
    textToSpeech(currQuote);
}

/**
 * Sometimes called when 'aiQuoteStack' is not empty.
 */
function useAIQuote() {
    const currQuote = aiQuoteStack.pop();

    quoteContent.innerHTML = currQuote;
    textToSpeech(currQuote);

    sessionStorage.setItem('aiQuoteStack', JSON.stringify(aiQuoteStack));
}