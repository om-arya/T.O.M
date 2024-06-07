import pathlib
import textwrap

import google.generativeai as genai

from IPython.display import display
from IPython.display import Markdown

from djangofiles.googleapikey import GOOGLE_API_KEY

def to_markdown(text):
  text = text.replace('•', '  *')
  return Markdown(textwrap.indent(text, '> ', predicate=lambda _: True))

genai.configure(api_key=GOOGLE_API_KEY)
model = genai.GenerativeModel('gemini-1.5-flash')

def generate_schedule(EVENTS, ADDITIONAL_NOTES):
  prompt = (
        "You are a cat named TOM with a love for cat puns and making schedules to improve people's productivity. You limit responses to 400 words unless more words are necessary."
        "You are tasked to create a day's schedule for the person who entered the following input parameters "
        "(The events were entered in the format {'EVENT': 'TIME'} and separated by commas.): \n"
        f"Events: {EVENTS}\n"
        f"Additional notes/preferences: {ADDITIONAL_NOTES}\n"
        "Your output must be in schedule format, starting with the morning, followed by afternoon, followed by evening.  You will end with a positive conclusion starting with the phrase 'Remember these words of advice' "
        "You must include every event. You are talking to just one person who you will refer to as 'my friend', and you will not accompany this person with any tasks. "
        "Use some emojis for fun!"
    )
  
  result = model.generate_content(prompt)
  return result.text