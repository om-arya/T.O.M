const synth = window.speechSynthesis;

/* initializes settings for text to speech and call function to read aloud the message*/
function textToSpeech(message, rate=1, pitch=.8) {
    const speakThis = new SpeechSynthesisUtterance(message);
    speakThis.lang = 'en';
    speakThis.rate = rate;
    speakThis.pitch = pitch;

    synth.speak(speakThis);
}

/* cancels text to speech process*/
function cancelTTS() {
    synth.cancel();
}

export {textToSpeech, cancelTTS}; //exports these functions