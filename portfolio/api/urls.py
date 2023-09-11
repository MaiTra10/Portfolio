from django.urls import path

from . import views

app_name = 'api'

urlpatterns = [
    
    path('projects/', views.ProjectsView.as_view(), name = 'projects'),
    path('socials/', views.SocialsView.as_view(), name = 'socials'),
    path('resume/', views.ResumeView.as_view(), name = 'resume')

]
