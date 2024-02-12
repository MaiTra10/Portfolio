from rest_framework import serializers
from . import models

class ProjectsSerializer(serializers.ModelSerializer):

    class Meta:

        model = models.Projects
        fields = '__all__'

class AboutMeSerializer(serializers.ModelSerializer):

    class Meta:

        model = models.AboutMe
        fields = '__all__'
        
class ExperienceSerializer(serializers.ModelSerializer):

    class Meta:

        model = models.Experience
        fields = '__all__'

class ResumeSerializer(serializers.ModelSerializer):

    class Meta:

        model = models.Resume
        fields = '__all__'

class ContactSerializer(serializers.ModelSerializer):

    class Meta:

        model = models.Contact
        fields = '__all__'
        
class MsgSerializer(serializers.Serializer):
    
    first_name = serializers.CharField(max_length=100)
    last_name = serializers.CharField(max_length=100)
    email = serializers.EmailField()
    message = serializers.CharField()