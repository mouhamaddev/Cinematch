from django.urls import path
from .views import MainView, CommentAnalyzer
#urls
urlpatterns = [
    path('api/<str:movie>/', MainView, name='main'),
    path('comment/<str:my_comment>/', CommentAnalyzer, name='comment'),
]
