from django.db import models

class Projects(models.Model):

    name = models.CharField(max_length = 50)
    image = models.ImageField(upload_to = 'project_thumbnails')
    diagram = models.ImageField(upload_to = 'project_diagrams')
    links = models.JSONField()
    description = models.TextField()
    frontend = models.JSONField()
    backend = models.JSONField()
    database = models.JSONField()
    host = models.JSONField()

    def __str__(self):
        return self.title
    
class Socials(models.Model):

    links = models.JSONField()

class Resume(models.Model):

    pdf = models.FileField(upload_to = 'resume')
    image = models.ImageField(upload_to = 'resume')