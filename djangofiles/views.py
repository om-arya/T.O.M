from django.shortcuts import render
from django.http import HttpResponse
from djangofiles.schedule import generate_schedule
from djangofiles.quotes import generate_pun

def home_view(request):
    return render(request, 'home.html')

def quotes_view(request):
    pun = generate_pun()
    return render(request, 'quotes.html', {'pun' : pun})

def about_us_view(request):
    return render(request, 'about-us.html')

def our_mission_view(request):
    return render(request, 'our-mission.html')

def schedule_view(request):
    return render(request, 'schedule.html')

def submit_form(request):
    event_names = request.GET.getlist('event')
    event_times = request.GET.getlist('time')

    EVENTS = dict(zip(event_names, event_times)) # map each event to its corresponding time
    ADDITIONAL_NOTES = request.GET.get('additionalNotes')

    # Return the result of the Google AI call with EVENTS and ADDITIONAL_NOTES
    result = generate_schedule(EVENTS, ADDITIONAL_NOTES)
    # index = result.index("Remember these words of advice")
    # speech = result[index :]
    return render(request, 'schedule.html', {'result' : result})