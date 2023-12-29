from django.urls import path, include
from .views import SignUpView, LogInView

from . import views

urlpatterns = [
    path('auth/', include('authentication.urls')), #TODO: promjenio sam s /auth jer mi je django reko
    path("", views.index, name="index"),

    # React functions
    path('save_SignUp/', SignUpView.sign_up_save, name='save_SignUp'),
    path('check_username/', SignUpView.check_username, name='check_username'),
    path('check_login/', LogInView.validateLogIn, name='validate_login'),
    path('get_user_data/', LogInView.sendUserData, name='send_user_data')
]
