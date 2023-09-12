from django.urls import path

from . import views

app_name = 'api'

urlpatterns = [
    
    path('projects/', views.ProjectsView.as_view(), name = 'projects'),
    path('about/', views.AboutMeView.as_view(), name = 'about'),
    path('resume/', views.ResumeView.as_view(), name = 'resume')

]
