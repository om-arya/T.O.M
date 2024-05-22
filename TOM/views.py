from django.shortcuts import render
from django.http import HttpResponse

def tom_html_view(request):
    return render(request, 'tom.html')