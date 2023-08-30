from django.urls import path
from .views import index
from api import views

app_name = 'page'

urlpatterns = [
    
    path('', index, name = 'index'),
    path('projects/', views.GetProjects.as_view(), name = 'projects')

]