import {textToSpeech, cancelTTS} from "./text-to-speech.js";

const premadeQuotes = ["Contentment is the greatest wealth.",
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
let aiQuoteStack = JSON.parse(sessionStorage.getItem('aiQuoteStack')) || [];
console.log(quoteCount);
console.log(aiQuoteStack);

/**
 * Clicking 'tomQuoteHead' always displays and reads a new quote, either from the
 * pre-made quotes, or an AI-generated quote from 'aiQuoteStack' if non-empty.
 * 
 * It also generates a new Django view, reloading the page.
 */

tomQuoteHead.addEventListener('click', () => {
    quoteCount++;
    sessionStorage.setItem('quoteCount', quoteCount);
})

/**
 * See 'views.py': The 'onclick' of 'tomQuoteHead' usually just reloads 'quotes.html' via 'quotes_view';
 *                 Every 4 quotes, in addition to reloading the page, we also generate a new batch of
 *                 5 quotes via 'generate_ai_quotes'.
 */

if (quoteCount % 5 === 0) {
    /**
     * Set up the next click such that the invisible 'aiQuotesContent' div
     * will receive a new batch of AI-generated quotes via Django.
     * On failure, the page is simply reloaded, and no quotes are received.
     */
    tomQuoteHead.setAttribute('onclick', "location.href='quotes+generate_ai_quotes+True'");
} else {
    // Check for AI-generated quotes and reset the click link to the normal Django view
    if (quoteCount % 5 === 1) { // AI-generated quotes were requested
        let newQuotes = aiQuotesContent.innerHTML;
        // Parse the 5 quotes in 'aiQuotesContent'
        // We filter out empty strings and '\n's
        newQuotes = newQuotes.split('*').slice(1).filter(quote => quote.length > 2);

        aiQuoteStack.push(...newQuotes);
        sessionStorage.setItem('aiQuoteStack', JSON.stringify(aiQuoteStack));
    }
    tomQuoteHead.setAttribute('onclick', "location.href='quotes+generate_ai_quotes+False'");
}

let quoteIndex = Math.floor(Math.random() * premadeQuotes.length);
// Use a pre-made quote, or an AI-generated quote if we have any stored
if (aiQuoteStack.length === 0) { // pre-made quote
    cancelTTS();

    const random = Math.random();
            
    // Increment 1, 2, or 3 quotes based on 'random' value
    if (quoteIndex >= premadeQuotes.length - 1) {
        quoteIndex = Math.floor(random * 3);
    } else if (random <= .34 || quoteIndex >= premadeQuotes.length - 2) {
        quoteIndex++;
    } else if (random <= .67 || quoteIndex >= premadeQuotes.length - 3) {
        quoteIndex += 2;
    } else {
        quoteIndex += 3;
    }

    displayAndRead(premadeQuotes[quoteIndex]);
} else { // AI-generated quote
    cancelTTS();

    displayAndRead(aiQuoteStack.pop());
    sessionStorage.setItem('aiQuoteStack', JSON.stringify(aiQuoteStack));
}

/**
 * Called on each click. Displays + reads either a pre-made quote or
 * an AI-generated quote.
 * 
 * @param {str} quote to display and read.
 */
function displayAndRead(quote) {
    quoteContent.innerHTML = quote;
    textToSpeech(quote);
}