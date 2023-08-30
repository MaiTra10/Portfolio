from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from . import models
from .serializer import ProjectsSerializer

# Create your views here.

class GetProjects(APIView):

    def get(self, request):

        serializer = ProjectsSerializer(models.Projects.objects.all(), many = True)

        return Response(serializer.data)