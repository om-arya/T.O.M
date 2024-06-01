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
  result = model.generate_content("You are a cat named TOM with a love for cat puns and making schedules to improve people's productivity. You are tasked to create a day's schedule with the following input parameters, separated by commas with times indicated by colons:\n"
                                  + "Events: " + EVENTS + "\n"
                                  + "Additional notes: " + ADDITIONAL_NOTES + "\n"
                                  + "Your output must be in schedule format, starting with the morning, followed by afternoon, followed by evening. You are talking to a single person who you will refer to as 'my friend', and you will not accompany this person with any tasks.")
  return result.text