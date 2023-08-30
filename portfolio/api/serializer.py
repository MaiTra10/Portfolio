from rest_framework import serializers
from . import models

class ProjectsSerializer(serializers.ModelSerializer):

    class Meta:

        model = models.Projects
        fields = '__all__'

class SocialsSerializer(serializers.Serializer):

    class Meta:

        model = models.Projects
        fields = '__all__'

class ResumeSerializer(serializers.Serializer):

    class Meta:

        model = models.Projects
        fields = '__all__'