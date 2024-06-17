import google.generativeai as genai
from djangofiles.googleapikey import GOOGLE_API_KEY

genai.configure(api_key=GOOGLE_API_KEY)
model = genai.GenerativeModel('gemini-1.5-flash')

def generate_quotes():
  prompt = "Give 5 bullet pointed one sentence, motivational, cat-themed proverbs. Nothing more."
  quote_response = model.generate_content(prompt)
  return quote_response