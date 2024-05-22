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