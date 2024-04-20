# Import the required module for text 
# to speech conversion
import pyttsx3
def text_to_speech(text):
    # init function to get an engine instance for the speech synthesis 
    engine = pyttsx3.init('dummy')
    # say method on the engine that passing input text to be spoken
    engine.say(text)

    # run and wait method, it processes the voice commands. 
    engine.runAndWait()