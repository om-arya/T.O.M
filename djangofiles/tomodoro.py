import google.generativeai as genai
from djangofiles.googleapikey import GOOGLE_API_KEY

genai.configure(api_key=GOOGLE_API_KEY)
model = genai.GenerativeModel('gemini-1.5-flash')

def generate_colors(mood: str):
  prompt = (
    "Generate 4 complimentary but contrasting color hex codes for page colors, with two different pastel colors for the background, one deep and saturated color for buttons, and a whiteish color for text on the buttons. "
    "The buttons must stand out on the background, and the text must stand out on the button.  The text cannot be black.  The two background colors must be two different colors, and they must not be darker than gray."
    "(Your response must be formatted exactly as '#xyzabc,#xyzabc,#xyzabc,#xyzabc' in the order of 'background, background, buttons, text')  "
    f"based on the following 'theme': { mood }"
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