from django.urls import path, include
from .views import check_username, check_login, save_signup

from . import views

urlpatterns = [
    path('/auth', include('authentication.urls')),
    path("", views.index, name="index"),

    # React functions
    path('check_username/', check_username, name='check_username'),
    path('check_login/', check_login, name='check_login'),
    path('save_SignUp/', save_signup, name='save_signup')
]
