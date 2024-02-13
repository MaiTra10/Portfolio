import configparser
import smtplib
import ssl
from django.conf import settings
from email.message import EmailMessage
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from .serializer import ProjectsSerializer, AboutMeSerializer, ExperienceSerializer, ResumeSerializer, ContactSerializer, MsgSerializer
from . import models

class ProjectsView(APIView):

    def get(self, request):

        serializer = ProjectsSerializer(models.Projects.objects.all(), many = True)

        return Response(serializer.data)
    
class AboutMeView(APIView):

    def get(self, request):

        serializer = AboutMeSerializer(models.AboutMe.objects.all(), many = True)

        return Response(serializer.data)
    
class ExperienceView(APIView):

    def get(self, request):

        serializer = ExperienceSerializer(models.Experience.objects.all(), many = True)

        return Response(serializer.data)
    
class ResumeView(APIView):

    def get(self, request):

        serializer = ResumeSerializer(models.Resume.objects.all(), many = True)

        return Response(serializer.data)
    
class ContactView(APIView):

    def get(self, request):

        serializer = ContactSerializer(models.Contact.objects.all(), many = True)

        return Response(serializer.data)

class SendMsg(APIView):
    
    def post(self, request):
        
        serializer = MsgSerializer(data = request.data)
        
        if serializer.is_valid():
            
            self.send_email(serializer.validated_data)
            return Response(serializer.validated_data, status = status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def send_email(self, data):
        
        cfg = configparser.ConfigParser()
        cfg.read('credentials.ini')
        
        sender_email = settings.EMAIL_HOST_USER
        sender_password = settings.EMAIL_HOST_PASSWORD
        
        recipients = [settings.RECIPIENT_EMAIL1, settings.RECIPIENT_EMAIL2]
        
        subject = "Portfolio | Message"
        body = """
        Name: {first_name} {last_name}
        E-mail: {email}
        Message: {message}
        """.format(first_name = data['first_name'], last_name = data['last_name'], email = data['email'], message = data['message'])
        
        em = EmailMessage()
        em['From'] = sender_email
        em['To'] = ", ".join(recipients)
        em['Subject'] = subject
        em.set_content(body)
        
        ctx = ssl.create_default_context()
        
        with smtplib.SMTP_SSL('smtp.gmail.com', 465, context = ctx) as smtp:
            
            smtp.login(sender_email, sender_password)
            smtp.sendmail(sender_email, recipients, em.as_string())