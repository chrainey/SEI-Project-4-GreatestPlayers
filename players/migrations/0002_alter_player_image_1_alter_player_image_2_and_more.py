# Generated by Django 4.1.1 on 2022-09-13 20:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('players', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='player',
            name='image_1',
            field=models.CharField(blank=True, default=None, max_length=300),
        ),
        migrations.AlterField(
            model_name='player',
            name='image_2',
            field=models.CharField(blank=True, default=None, max_length=300),
        ),
        migrations.AlterField(
            model_name='player',
            name='image_3',
            field=models.CharField(blank=True, default=None, max_length=300),
        ),
    ]