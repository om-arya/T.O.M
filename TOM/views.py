from django.shortcuts import render
from django.http import HttpResponse
from voice_model import text_to_speech

def tom_html_view(request):
    return render(request, 'tom.html')

def say_hello_world(request):
    text_to_speech('Hello world!')
    return HttpResponse("Hello World")