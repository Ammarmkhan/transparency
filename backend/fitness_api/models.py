from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class PersonalWorkouts(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    workout_name = models.CharField(max_length=64, blank=True)
    date = models.DateTimeField(blank=True)
    duration = models.IntegerField(blank=True)
    set_order = models.IntegerField(blank=True)
    weight = models.FloatField(blank=True)
    reps = models.IntegerField(blank=True)
    distance = models.FloatField(blank=True)
    seconds = models.IntegerField(blank=True)
    notes = models.CharField(max_length=256, blank=True)
    workout_notes = models.CharField(max_length=256, blank=True)
    rpe = models.FloatField(blank=True, null=True)
    exercise_name = models.CharField(max_length=64, blank=True)
    chest = models.BooleanField(default=False)
    back = models.BooleanField(default=False)
    arms = models.BooleanField(default=False)
    abdominals = models.BooleanField(default=False)
    legs = models.BooleanField(default=False)
    shoulders = models.BooleanField(default=False)