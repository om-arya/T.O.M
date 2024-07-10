"""
URL configuration for TOM project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views - WHAT WE ARE USING
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', views.home_view, name = 'home'),
    path('home', views.home_view, name = 'homealt'),
    path('quotes+generate_ai_quotes+False', views.quotes_view, name = 'quotes'),
    path('about-us', views.about_us_view, name = 'aboutus'),
    path('our-mission', views.our_mission_view, name = 'ourmission'),
    path('schedule', views.schedule_view, name = 'schedule'),
    path('tomodoro', views.tomodoro_view, name = 'tomodoro'),
    path('submit_form', views.submit_form, name='submit_form'),
    path('quotes+generate_ai_quotes+True', views.generate_ai_quotes, name='generate_ai_quotes'),
    path('tomodoro+generate_ai_colors', views.generate_ai_colors, name='generate_ai_colors'),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)