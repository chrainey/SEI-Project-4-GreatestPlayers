# Generated by Django 4.1.1 on 2022-09-14 16:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jwt_auth', '0002_remove_user_profile_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='profile_image',
            field=models.CharField(blank=True, max_length=500),
        ),
    ]
