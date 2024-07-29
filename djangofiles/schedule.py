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
        "You must include breakfast before 11am, lunch between 11am and 2pm, and dinner after 5pm. Every event must take exactly as long as specified by the user, and you will display ranges in the format of 0:00 AM/PM - 0:00 AM/PM."
        "Use some emojis, but do not use emojis in your positive conclusion."
    )
  
  result = format(model.generate_content(prompt).text)
  return result

def format(text):
  new_text = "<h1>Your Purr-fect Schedule!</h1><p>"

  char_index, length = 0, len(text)
  while char_index < length - 1:
    # Don't append bullet points
    if text[char_index:char_index + 2] == "* ":
      char_index += 2
    # Don't append '#'s; don't append '<'s nor '>'s to prevent script injection
    elif text[char_index] == '#' or text[char_index] == '<' or text[char_index] == '>':
      char_index += 1
    # Create enclosing <p>'s for each line
    elif text[char_index] == '\n':
      new_text += "</p><p>"
      char_index += 2
    # Append bold text with <strong>'s
    elif text[char_index:char_index + 2] == "**":
      char_index += 2
      new_text += "<strong>"
      while char_index < length - 1 and text[char_index] != '*':
        new_text += text[char_index]
        char_index += 1
      new_text += "</strong>"
      char_index += 2
    # Regular character, just append it
    else:
      new_text += text[char_index]
      char_index += 1
  new_text += text[char_index]
  
  return new_text