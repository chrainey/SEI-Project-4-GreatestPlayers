from django.db import models

# Create your models here.
class Club(models.Model):
  name = models.CharField(max_length=50, default=None)
  image_1 = models.CharField(max_length=300, default=None, blank=True)
  image_2 = models.CharField(max_length=300, default=None, blank=True)
  image_3 = models.CharField(max_length=300, default=None, blank=True)
  country = models.CharField(max_length=50, default=None)
  stadium = models.CharField(max_length=50, default=None)
  stadium_capacity = models.PositiveIntegerField(default=None)
  info = models.TextField(max_length=500, default=None, blank=True)

  def __str__(self):
    return f"{self.name} - {self.country}"