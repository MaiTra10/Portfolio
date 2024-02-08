from django.urls import path

from . import views

app_name = 'api'

urlpatterns = [
    
    path('projects/', views.ProjectsView.as_view(), name = 'projects'),
    path('about/', views.AboutMeView.as_view(), name = 'about'),
    path('experience/', views.ExperienceView.as_view(), name = 'experience'),
    path('resume/', views.ResumeView.as_view(), name = 'resume'),
    path('contact/', views.ContactView.as_view(), name = 'contact')

]
