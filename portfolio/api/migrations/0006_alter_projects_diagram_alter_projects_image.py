# Generated by Django 4.2.4 on 2023-09-30 03:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_alter_projects_diagram_alter_projects_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='projects',
            name='diagram',
            field=models.ImageField(upload_to='page/static/media/project_diagrams'),
        ),
        migrations.AlterField(
            model_name='projects',
            name='image',
            field=models.ImageField(upload_to='page/static/media/project_thumbnails'),
        ),
    ]