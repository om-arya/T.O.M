from django.shortcuts import render
from django.http import HttpResponse
from djangofiles.schedule import generate_schedule
from djangofiles.quotes import generate_quotes
from djangofiles.tomodoro import generate_colors

def home_view(request):
    return render(request, 'home.html')

def quotes_view(request):
    return render(request, 'quotes.html')

def generate_ai_quotes(request):
    quote_response = generate_quotes()
    if quote_response != "ERROR" and quote_response.parts:
        return render(request, 'quotes.html', {'ai_quotes' : quote_response.text})
    else: # No response generated
        return quotes_view(request)

def about_us_view(request):
    return render(request, 'about-us.html')

def about_tom_view(request):
    return render(request, 'about-tom.html')

def schedule_view(request):
    return render(request, 'schedule.html')

def submit_form(request):
    event_names = request.GET.getlist('event')
    event_times = request.GET.getlist('time')

    EVENTS = str(dict(zip(event_names, event_times)))[1:] # map each event to its corresponding time
    ADDITIONAL_NOTES = request.GET.get('additionalNotes')

    # Return the result of the Google AI call with EVENTS and ADDITIONAL_NOTES
    result = generate_schedule(EVENTS, ADDITIONAL_NOTES)
    if result == "ERROR":
        return render(request, 'schedule.html', {'result' : "Mreow! There was an error creating your schedule. Please try again."})
    return render(request, 'schedule.html', {'result' : result})

def tomodoro_view(request):
    return render(request, 'tomodoro.html')

def generate_ai_colors(request):
    mood = request.GET.get('mood-prompt')
    if mood == "" :
        mood = "random"
    hexcodes = generate_colors(mood)

    default_bg = "#34cb76"
    default_mid = "#ffffff"
    default_btn = "#34cb76"
    default_txt =  "#ffffff"
    if len(hexcodes) != 4:
        hexcodes = [default_bg, default_mid, default_btn, default_txt]
    try:
        return render(request, 'tomodoro.html', {'background_color' : hexcodes[0],
                                             'middle_color' : hexcodes[1],
                                             'buttons_color' : hexcodes[2],
                                             'text_color' : hexcodes[3]})
    except:
        return render(request, 'tomodoro.html', {'background_color' : default_bg,
                                             'middle_color' : default_mid,
                                             'buttons_color' : default_btn,
                                             'text_color' : default_txt})