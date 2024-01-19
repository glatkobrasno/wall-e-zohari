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
    path('get_products_from_recipe/', ProductsView.get_products_from_recipe, name='get_products_from_recipe'),
    path('get_profile_data/', ProfileView.getProfile, name='add_product'),
    path('is_following/', ProfileView.isFollowing, name='is_following'),
    path('follow/', ProfileView.followUser, name='follow'),
    path('unfollow/', ProfileView.unFollowUser, name='unfollow'),
    path('add_diet/', Dietview.addDiet, name='addDiet'),
    path('get_comments/', CommentView.getComents, name='get_comments'),
    path('add_comments/', CommentView.saveComment, name='add_comments'),
    path('add_reply/', CommentView.addReply, name='add_reply'),
    path('get_cookbookdata/', Cookbook.get_cookbookdata, name='get_cookbookdata'),
    path('get_cookbooks/', Cookbook.get_cookbooks, name='get_cookbooks'),
    path('get_recipedata/', Recipe.get_recipedata, name='get_recipedata'),
    path('get_recipes_from_cookbook/', Recipe.get_recipes_from_cookbook, name='get_recipes_from_cookbook'),
    path('add_cookbook/', CookbookView.addCookbook, name='add_cookbook'),
    path('add_recipe/', RecipeView.addRecipe, name='add_recipe'),
    path('get_steps_from_recipe/', Step.get_steps_from_recipe, name='get_steps_from_recipe'),
    path('get_recipe_with/', Recipe.get_recipes_with, name='get_recipes_with'),
    path('get_all_diets/',Dietview.get_all_diets , name='get_all_diets'),
    path('alter_diet/',Dietview.alter_diet, name='alter_diet'),
    path('mark_recipe/', Recipe.markRecipe, name='mark_recipe'),
    path('get_graph_data/',HistoryView.getGraphData, name='get_graph_data'),
    
]
