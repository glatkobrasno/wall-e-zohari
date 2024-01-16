from django.urls import path, include
from .views import *

from . import views

urlpatterns = [
    path('auth/', include('authentication.urls')), #TODO: promjenio sam s /auth jer mi je django reko
    path("", views.index, name="index"),

    # React functions
    path('save_SignUp/', SignUpView.sign_up_save, name='save_SignUp'),
    path('check_username/', SignUpView.check_username, name='check_username'),
    path('check_login/', LogInView.validateLogIn, name='validate_login'),
    path('get_user_data/', LogInView.sendUserData, name='send_user_data'),
    path('add_product/', ProductsView.addProduct, name='add_product'),
    path('get_profile_data/', ProfileView.getProfile, name='add_product'),
    path('is_following/', ProfileView.isFollowing, name='is_following'),
    path('follow/', ProfileView.followUser, name='follow'),
    path('unfollow/', ProfileView.unFollowUser, name='unfollow'),
    path('add_diet/', Dietview.addDiet, name='addDiet'),
    path('get_comments/', CommentView.getComents, name='get_comments'),
    path('add_comments/', CommentView.saveComment, name='add_comments'),
    path('add_reply/', CommentView.addReply, name='add_reply'),
]
