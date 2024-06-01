from django.shortcuts import render
from django.http import HttpResponse

def home_view(request):
    return render(request, 'home.html')

def tom_view(request):
    return render(request, 'tom.html')

def about_us_view(request):
    return render(request, 'about-us.html')

def our_mission_view(request):
    return render(request, 'our-mission.html')

def schedule_view(request):
    return render(request, 'schedule.html')

def submit_form(request):
    if request.method == 'GET':
        events = request.GET.get('events')
        additional_notes = request.GET.get('additionalNotes')
        return HttpResponse(f"Events: {events}, Additional Notes: {additional_notes}")
    else:
        return HttpResponse("Only GET method is allowed.")