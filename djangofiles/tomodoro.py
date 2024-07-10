import google.generativeai as genai
from googleapikey import GOOGLE_API_KEY

genai.configure(api_key=GOOGLE_API_KEY)
model = genai.GenerativeModel('gemini-1.5-flash')

def generate_colors(mood: str):
  prompt = (
    "Generate 3 complimentary color hex codes for a background, buttons, and the text on the buttons "
    "(Your response must be formatted exactly as '#xyzabc,#xyzabc,#xyzabc') "
    f"based on the following 'mood': { mood }"
  ) 
  
  # String list formatted ['#xyzabc', '#xyzabc', '#xyzabc'].
  hexcodes = model.generate_content(prompt).text.replace("\n", "").replace(" ", "").split(",")

  if len(hexcodes) != 3:
    return ["ERROR"]
  for hex in hexcodes:
    if not (hex[0] == "#" and len(hex) == 7):
      return ["ERROR"]
    
  return hexcodes