from django.db import models

# Create your models here.
class Player(models.Model):
  name = models.CharField(max_length=100, default=None)
  position = models.CharField(max_length=50, default=None)
  nationality = models.CharField(max_length=50, default=None)
  info = models.TextField(max_length=500, default=None, blank=True)
  goals = models.PositiveIntegerField(default=None)
  international_caps = models.PositiveIntegerField(default=None)
  shirt_number = models.PositiveIntegerField(default=None)
  image_1 = models.CharField(max_length=300, default=None, blank=True)
  image_2 = models.CharField(max_length=300, default=None, blank=True)
  image_3 = models.CharField(max_length=300, default=None, blank=True)
  clubs = models.ManyToManyField(
    "clubs.Club",
    related_name="players"
  )

  def __str__(self):
    return f"{self.name} - {self.position} - {self.nationality}"