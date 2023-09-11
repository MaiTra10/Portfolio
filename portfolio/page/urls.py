from django.urls import path, include
from .views import index

app_name = 'page'

urlpatterns = [
    
    path('', index, name = 'index'),
    path('api/', include('api.urls'))

]