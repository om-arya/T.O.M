function textToSpeech(message) {
    const synth = window.speechSynthesis;
    const speakThis = new SpeechSynthesisUtterance(message);
    speakThis.lang = 'en';
    speakThis.pitch = .8;
    speakThis.rate = 1;
    synth.speak(speakThis);
}

export default textToSpeech;