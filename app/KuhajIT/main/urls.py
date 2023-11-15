from django.urls import path, include

from . import views

urlpatterns = [
    path('/auth', include('authentication.urls')),
    path("", views.index, name="index"),
]