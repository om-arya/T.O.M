const synth = window.speechSynthesis;

function textToSpeech(message, rate=1, pitch=.8) {
    const speakThis = new SpeechSynthesisUtterance(message);
    speakThis.lang = 'en';
    speakThis.rate = rate;
    speakThis.pitch = pitch;

    synth.speak(speakThis);
}

function cancelTTS() {
    synth.cancel();
}

export {textToSpeech, cancelTTS};