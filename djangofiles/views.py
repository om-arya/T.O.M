from django.shortcuts import render
from django.http import HttpResponse
from djangofiles.schedule import generate_schedule
from djangofiles.quotes import generate_quotes

def home_view(request):
    return render(request, 'home.html')

def quotes_view(request):
    return render(request, 'quotes.html')

def generate_ai_quotes(request):
    quote_response = generate_quotes()
    if quote_response.parts:
        return render(request, 'quotes.html', {'ai_quotes' : quote_response.text})
    else: # No response generated
        return quotes_view(request)

def about_us_view(request):
    return render(request, 'about-us.html')

def our_mission_view(request):
    return render(request, 'our-mission.html')

def schedule_view(request):
    return render(request, 'schedule.html')

def tomodoro_view(request):
    return render(request, 'tomodoro.html')

def submit_form(request):
    event_names = request.GET.getlist('event')
    event_times = request.GET.getlist('time')

    EVENTS = dict(zip(event_names, event_times)) # map each event to its corresponding time
    ADDITIONAL_NOTES = request.GET.get('additionalNotes')

    # Return the result of the Google AI call with EVENTS and ADDITIONAL_NOTES
    result = generate_schedule(EVENTS, ADDITIONAL_NOTES)
    return render(request, 'schedule.html', {'result' : result})