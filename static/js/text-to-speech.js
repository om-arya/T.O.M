const synth = window.speechSynthesis;
const maleVoices = [
    "Microsoft David Desktop - English (United States)",
    "Alex",
    "Daniel",
    "Sin-Ji",
    "Maged",
];

function loadVoices() {
    return new Promise((resolve) => {
        let voices = synth.getVoices();
        if (voices.length !== 0) {
            resolve(voices);
        } else {
            synth.onvoiceschanged = () => {
                voices = synth.getVoices();
                resolve(voices);
            };
        }
    });
}

const voices = await loadVoices();
const voice = voices.find(({ name }) => maleVoices.includes(name));

function textToSpeech(message, rate=1, pitch=.8) {
    const speakThis = new SpeechSynthesisUtterance(message);
    speakThis.lang = 'en';
    speakThis.rate = rate;
    speakThis.pitch = pitch;
    speakThis.voice = voice;

    synth.speak(speakThis);
}

function cancelTTS() {
    synth.cancel();
}

export {textToSpeech, cancelTTS};