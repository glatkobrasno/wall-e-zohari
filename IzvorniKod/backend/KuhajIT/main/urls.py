from django.urls import path, include
from .views import SignUpView

from . import views

urlpatterns = [
    path('auth/', include('authentication.urls')),
    path("", views.index, name="index"),

    # React functions
    path('save_SignUp/', SignUpView.sign_up_save, name='save_SignUp'),
    path('check_username/', SignUpView.sign_up_save, name='check_username'),
]
