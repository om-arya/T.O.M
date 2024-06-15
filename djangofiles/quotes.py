import google.generativeai as genai
from djangofiles.googleapikey import GOOGLE_API_KEY

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
        "Use some emojis, but do not use emojis in your positive conclusion."
    )
  
  result = format(model.generate_content(prompt).text)
  return result

def generate_pun(TASK):
  prompt = TASK
  pun = format(model.generate_content(prompt).text)
  return pun

def format(text):
  new_text = "<h1>Your Purr-fect Schedule!</h1><p>"

  i = 0
  length = len(text)
  while i < length - 1:
    if text[i:i + 2] == "* ": # skip bullet points
      i += 2
    elif text[i] == '#' or text[i] == '>': # skip '#'s, and '>'s to prevent script injection
      i += 1
    elif text[i] == '\n': # append <p>'s for each newline
      new_text += "</p><p>"
      i += 2
    elif text[i:i + 2] == "**": # append bold text
      i += 2
      new_text += "<strong>"
      while i < length - 1 and text[i] != '*':
        new_text += text[i]
        i += 1
      new_text += "</strong>"
      i += 2
    else:
      new_text += text[i]
      i += 1
  new_text += text[i]
  
  return new_text