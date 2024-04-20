# Import the required module for text 
# to speech conversion
from gtts import gTTS
import os
def text_to_speech(text):
    speech = gTTS(text = text, tld = 'fr', lang = 'fr')
    
    speech_file = 'speech.mp3'
    speech.save(speech_file)

    os.system('afplay ' + speech_file)