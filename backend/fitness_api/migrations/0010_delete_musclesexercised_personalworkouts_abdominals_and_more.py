# Generated by Django 5.0 on 2023-12-21 19:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('fitness_api', '0009_remove_personalworkouts_onerm'),
    ]

    operations = [
        migrations.DeleteModel(
            name='MusclesExercised',
        ),
        migrations.AddField(
            model_name='personalworkouts',
            name='abdominals',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='personalworkouts',
            name='arms',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='personalworkouts',
            name='back',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='personalworkouts',
            name='chest',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='personalworkouts',
            name='legs',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='personalworkouts',
            name='shoulders',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='personalworkouts',
            name='id',
            field=models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
    ]
