from django.shortcuts import render
from django.http import HttpResponse

def index_html_view(request):
    return render(request, 'index.html')