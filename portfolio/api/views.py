from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializer import ProjectsSerializer, SocialsSerializer, ResumeSerializer
from . import models

class ProjectsView(APIView):

    def get(self, request):

        serializer = ProjectsSerializer(models.Projects.objects.all(), many = True)

        return Response(serializer.data)
    
class SocialsView(APIView):

    def get(self, request):

        serializer = SocialsSerializer(models.Socials.objects.all(), many = True)

        return Response(serializer.data)
    
class ResumeView(APIView):

    def get(self, request):

        serializer = ResumeSerializer(models.Resume.objects.all())

        return Response(serializer.data)