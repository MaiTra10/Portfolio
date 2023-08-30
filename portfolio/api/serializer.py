from rest_framework import serializers

class ProjectSerializer(serializers.Serializer):

    name = serializers.CharField()
    image = serializers.ImageField()
    diagram = serializers.ImageField()
    links = serializers.JSONField()
    description = serializers.TextField()
    frontend = serializers.JSONField()
    backend = serializers.JSONField()
    database = serializers.JSONField()
    host = serializers.JSONField()

class Socials(serializers.Serializer):

    links = serializers.JSONField()

class Resume(serializers.Serializer):

    pdf = serializers.FileField()
    image = serializers.ImageField()