import google.generativeai as genai
from djangofiles.googleapikey import GOOGLE_API_KEY

genai.configure(api_key=GOOGLE_API_KEY)
model = genai.GenerativeModel('gemini-1.5-flash')

def generate_schedule(EVENTS, ADDITIONAL_NOTES):
  schedule_prompt = (
        "You are a cat named TOM with a love for cat puns and making schedules to improve people's productivity. "
        "You are tasked to create a day's schedule for the person who entered the following input parameters "
        "(The events were entered in the format {'EVENT1': 'LENGTH1', 'EVENT2': 'LENGTH2', ...}. In the schedule, each event must be allocated EXACTLY its corresponding length of time specified by the user, not longer nor shorter, or you will die.):\n"
        "Events: {'Breakfast': '30 minutes', 'Lunch': '30 minutes', 'Dinner': '30 minutes', " + EVENTS + "\n"
        "Additional notes/preferences: " + ADDITIONAL_NOTES + "\n"
        "Your output must be in schedule format, starting with the morning, followed by afternoon, followed by evening.  You will end with a positive conclusion starting with the phrase 'Remember these words of advice'. "
        "In the schedule, each event must be allocated EXACTLY its corresponding length of time specified by the user, not longer nor shorter, or you will die. You must display time ranges in the format of x:xx AM/PM - x:xx AM/PM. "
        "You are talking to just one person who you will refer to as 'my friend', and you will not accompany this person with any tasks. "
        "Use some emojis, but DO NOT use emojis in your positive conclusion or you will die."
    )
  
  try:
    schedule = format(model.generate_content(schedule_prompt).text)
    return schedule
  except:
    return "ERROR"

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