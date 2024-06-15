import google.generativeai as genai
from djangofiles.googleapikey import GOOGLE_API_KEY

genai.configure(api_key=GOOGLE_API_KEY)
model = genai.GenerativeModel('gemini-1.5-flash')

def generate_pun():
  prompt = "Make a one sentence motivational, cat-themed message. Feel free to use puns!"
  pun = model.generate_content(prompt).text
  return pun
