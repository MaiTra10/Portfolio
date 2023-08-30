from django.urls import path
from .views import index
from api import views

app_name = 'page'

urlpatterns = [
    
    path('', index, name = 'index'),
    path('projects/', views.ProjectsView.as_view(), name = 'projects'),
    path('socials/', views.SocialsView.as_view(), name = 'socials'),
    path('resume/', views.ResumeView.as_view(), name = 'resume')
    

]