import google.generativeai as genai
from djangofiles.googleapikey import GOOGLE_API_KEY

genai.configure(api_key=GOOGLE_API_KEY)
model = genai.GenerativeModel('gemini-1.5-flash')

def generate_colors(mood: str):
  prompt = (
    "Generate 4 complimentary color hex codes for a background, a different color for the background, buttons, and the text on the buttons "
    "The text color cannot be black."
    "(Your response must be formatted exactly as '#xyzabc,#xyzabc,#xyzabc,#xyzabc') "
    f"based on the following 'mood': { mood }"
  ) 
  
  # String list formatted ['#xyzabc', '#xyzabc', '#xyzabc'].
  hexcodes = model.generate_content(prompt).text.replace("\n", "").replace(" ", "").replace(" ", "").split(",")
  if len(hexcodes) != 4:
    return ["ERROR"]
  for hex in hexcodes:
    if not (hex[0] == "#" and len(hex) == 7):
      return ["ERROR"]
  print(hexcodes)
  return hexcodes