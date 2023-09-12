from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializer import ProjectsSerializer, AboutMeSerializer, ResumeSerializer
from . import models

class ProjectsView(APIView):

    def get(self, request):

        serializer = ProjectsSerializer(models.Projects.objects.all(), many = True)

        return Response(serializer.data)
    
class AboutMeView(APIView):

    def get(self, request):

        serializer = AboutMeSerializer(models.AboutMe.objects.all(), many = True)

        return Response(serializer.data)
    
class ResumeView(APIView):

    def get(self, request):

        serializer = ResumeSerializer(models.Resume.objects.all())

        return Response(serializer.data)