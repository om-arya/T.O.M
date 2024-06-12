const synth = window.speechSynthesis;
function textToSpeech(message) {
    const speakThis = new SpeechSynthesisUtterance(message);
    speakThis.lang = 'en';
    speakThis.pitch = .8;
    speakThis.rate = 1;
    synth.speak(speakThis);
}

function cancelTTS() {
    synth.cancel();
}

export {textToSpeech, cancelTTS};