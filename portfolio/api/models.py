from django.db import models

class Projects(models.Model):

    name = models.CharField(max_length = 50)
    image = models.ImageField(upload_to = '')
    diagram = models.ImageField(upload_to = '')
    links = models.JSONField()
    description = models.TextField()
    frontend = models.JSONField()
    backend = models.JSONField()
    database = models.JSONField()
    tools = models.JSONField()
    host = models.JSONField()

    class Meta:

        ordering = ("id",)
        verbose_name_plural = 'Projects'

    def __str__(self):
        return self.name
    
class AboutMe(models.Model):

    description = models.TextField()
    tech_stack = models.JSONField()
    socials = models.JSONField()

    class Meta:

        verbose_name_plural = 'About Me'

    def __str__(self):
        return 'About'

class Resume(models.Model):

    pdf = models.FileField(upload_to = '')
    image = models.ImageField(upload_to = '')

    class Meta:

        verbose_name_plural = 'Resume'

    def __str__(self):
        return 'Resume'
    
class Contact(models.Model):

    html = models.TextField()

    class Meta:

        verbose_name_plural = 'Contact'

    def __str__(self):
        return 'Contact'