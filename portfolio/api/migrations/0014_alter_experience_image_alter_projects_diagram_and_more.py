# Generated by Django 5.0.1 on 2024-02-15 22:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0013_alter_experience_image_alter_projects_diagram_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='experience',
            name='image',
            field=models.TextField(),
        ),
        migrations.AlterField(
            model_name='projects',
            name='diagram',
            field=models.TextField(),
        ),
        migrations.AlterField(
            model_name='projects',
            name='image',
            field=models.TextField(),
        ),
        migrations.AlterField(
            model_name='resume',
            name='image',
            field=models.TextField(),
        ),
        migrations.AlterField(
            model_name='resume',
            name='pdf',
            field=models.TextField(),
        ),
    ]