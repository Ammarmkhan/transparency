# Generated by Django 5.0 on 2023-12-13 17:25

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='PersonalWorkouts',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateTimeField(blank=True)),
                ('workout_name', models.CharField(default='Not Applicable', max_length=64)),
                ('duration', models.IntegerField(blank=True)),
                ('exercise_name', models.CharField(blank=True, max_length=64)),
                ('set_order', models.IntegerField(blank=True)),
                ('weight', models.FloatField(blank=True)),
                ('reps', models.IntegerField(blank=True)),
                ('distance', models.FloatField(blank=True)),
                ('seconds', models.IntegerField(blank=True)),
                ('notes', models.CharField(blank=True, max_length=256)),
                ('workout_notes', models.CharField(blank=True, max_length=256)),
                ('rpe', models.FloatField(blank=True)),
                ('oneRM', models.FloatField(blank=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='MusclesExercised',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('chest', models.BooleanField(default=False)),
                ('back', models.BooleanField(default=False)),
                ('arms', models.BooleanField(default=False)),
                ('abdominals', models.BooleanField(default=False)),
                ('legs', models.BooleanField(default=False)),
                ('shoulders', models.BooleanField(default=False)),
                ('exercise_name', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='fitness_api.personalworkouts')),
            ],
        ),
    ]
