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

urlpatterns = [
    path('', views.home_view, name = 'home'),
    path('home.html', views.home_view, name = 'homealt'),
    path('tom.html', views.tom_view, name = 'tom'),
    path('about-us.html', views.about_us_view, name = 'aboutus'),
    path('our-mission.html', views.our_mission_view, name = 'ourmission'),
    path('schedule.html', views.schedule_view, name = 'schedule'),
]
