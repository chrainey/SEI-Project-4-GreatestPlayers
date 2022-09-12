from tkinter import CASCADE
from django.db import models

# Create your models here.
class Review(models.Model):
  text =models.TextField(max_length=300)
  created_at = models.DateTimeField(auto_now_add=True)
# below is One to many relationship. Hence player no players
  player = models.ForeignKey(
    "players.Player", # this is players app and then the class name which is player
    related_name="reviews",
    on_delete= models.CASCADE
  )
  owner = models.ForeignKey(
    'jwt_auth.User',
    related_name="reviews",
    on_delete = models.CASCADE
  )