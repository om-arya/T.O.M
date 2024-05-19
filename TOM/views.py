from django.shortcuts import render
from django.http import HttpResponse

def tom_html_view(request):
    return render(request, 'tom.html')

"""
def login():

def home_page():

def tom_page():

def about_page():

def our_mission_page():

def generate_schedule():
"""