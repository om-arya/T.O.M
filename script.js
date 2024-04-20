// let random= document.querySelector('tom-trigger');
let result= document.querySelector('h1');

function getRandomNumber(min, max){
    let step1 = max - min + 1;
    let step2 = Math.random() * step1;
    let result = Math.floor(step2) + min;

    return result;
}

// random.addEventListener('click', () => {
//     let index = getRandomNumber(0, messages.length-1);
//     result.innerText = messages[index];
// })

$('#tom-trigger').click(function(){
    let index = getRandomNumber(0, messages.length-1);
    result.innerText = messages[index];
    testToSpeech(messages[index])
})

function textToSpeech(message) {
    const synth = window.speechSynthesis;
    const speakThis = new SpeechSynthesisUtterance(message);
    speakThis.lang = 'es-ES';
    synth.speak(speakThis);
}

const messages= ["Paws for a moment, but never stop moving forward.",
                "Every stumble is a step closer to success.",
                "Embrace challenges; they sharpen your claws.",
                "In the pursuit of knowledge, curiosity is your whisker guide.",
                "Dream big, but remember, even small steps lead to grand adventures.",
                "Keep your focus sharp, like a cat stalking its prey.",
                "Let your inner lion roar with determination.",
                "Don't let fear distract you; courage is your best companion.",
                "In every setback, seek the lesson hidden within.",
                "Your journey is unique; comparison is the thief of purr-sonal growth.",
                "Every day is a new chance to chase your dreams.",
                "Trust in your instincts; they're as reliable as a feline's intuition.",
                "Meow-tivation comes from within; tap into your inner drive.",
                "Embrace the discomfort of growth; it's where transformation begins.",
                "Like a cat with nine lives, you have countless opportunities for success.",
                "Your potential is as vast as the open sky; soar high, little bird.",
                "Resilience is your armor against the arrows of doubt.",
                "Cultivate gratitude; it's the sunshine that nourishes your soul.",
                "In the garden of knowledge, persistence is the water that makes flowers bloom.",
                "Find joy in the journey, not just the destination.",
                "Embrace failure; it's the fertilizer for future success.",
                "Stay curious, like a kitten exploring the world for the first time.",
                "Even in darkness, there's always a glimmer of hope.",
                "Believe in yourself, even when others doubt you.",
                "Let passion be your compass; it will guide you through stormy seas.",
                "Success isn't a sprint; it's a marathon of small victories.",
                "Embrace uncertainty; it's the spice that makes life exciting.",
                "Be kind to yourself; you're doing better than you think.",
                "Celebrate progress, no matter how small.",
                "Perseverance is your superpower; never underestimate its strength.",
                "Life is a tapestry of experiences; weave your story with courage and conviction.",
                "Don't be afraid to ask for help; even the mightiest lion relies on its pride.",
                "Your potential is limitless, like the vast expanse of the night sky.",
                "Stay curious, stay hungry for knowledge.",
                "Let passion ignite your soul and fuel your journey.",
                "You're capable of greatness; believe it, achieve it.",
                "In every challenge, there's an opportunity for growth.",
                "Setbacks are detours, not roadblocks; keep forging ahead.",
                "Your journey may have twists and turns, but each one leads you closer to your destination.",
                "Stay focused, stay determined, and success will be yours.",
                "The harder you work, the luckier you get.",
                "Your mind is a garden; cultivate it with positivity and watch your dreams blossom.",
                "Dare to dream big; the world is your playground.",
                "Strive for progress, not perfection.",
                "You have the power to shape your destiny; wield it wisely.",
                "Every challenge is an opportunity to learn and grow stronger.",
                "Your potential knows no bounds; let your aspirations soar.",
                "Chase your dreams with the ferocity of a cat chasing a mouse.",
                "The journey may be long, but the destination is worth it."]