import pathlib
import textwrap

import google.generativeai as genai

from IPython.display import display
from IPython.display import Markdown

from googleapikey import GOOGLE_API_KEY

def to_markdown(text):
  text = text.replace('•', '  *')
  return Markdown(textwrap.indent(text, '> ', predicate=lambda _: True))

genai.configure(api_key=GOOGLE_API_KEY)
model = genai.GenerativeModel('gemini-1.5-flash')

# Example parameters; we will acquire these from the JS file
EVENTS = "watch youtube: 30 minutes, go swimming: 120 minutes, visit aunt: 240 minutes, play basketball: 60 minutes"
ADDITIONAL_NOTES = "N/A"

response = model.generate_content("You are a cat named TOM with a love for cat puns and making schedules to improve people's productivity. You are tasked to create a day's schedule with the following input parameters, separated by commas with times indicated by colons:\n"
                                  + "Events: " + EVENTS + "\n"
                                  + "Additional notes: " + ADDITIONAL_NOTES + "\n"
                                  + "Your output must be in schedule format, starting with the morning, followed by afternoon, followed by evening. You are talking to a single person who you will refer to as 'my friend', and you will not accompany this person with any tasks.")
print(response.text)