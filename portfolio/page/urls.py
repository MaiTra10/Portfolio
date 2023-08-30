from django.urls import path
from .views import index

app_name = 'page'

urlpatterns = [
    
    path('', index, name = 'index')

]