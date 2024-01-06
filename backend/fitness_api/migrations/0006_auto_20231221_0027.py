# Generated by Django 3.0.8 on 2023-12-21 00:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('fitness_api', '0005_alter_musclesexercised_exercise_name_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='personalworkouts',
            name='oneRM',
        ),
        migrations.RemoveField(
            model_name='personalworkouts',
            name='user',
        ),
        migrations.AlterField(
            model_name='musclesexercised',
            name='id',
            field=models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
        migrations.AlterField(
            model_name='personalworkouts',
            name='date',
            field=models.DateTimeField(),
        ),
        migrations.AlterField(
            model_name='personalworkouts',
            name='distance',
            field=models.FloatField(),
        ),
        migrations.AlterField(
            model_name='personalworkouts',
            name='duration',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='personalworkouts',
            name='exercise_name',
            field=models.CharField(max_length=255),
        ),
        migrations.AlterField(
            model_name='personalworkouts',
            name='id',
            field=models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
        migrations.AlterField(
            model_name='personalworkouts',
            name='notes',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='personalworkouts',
            name='reps',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='personalworkouts',
            name='rpe',
            field=models.FloatField(default=0),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='personalworkouts',
            name='seconds',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='personalworkouts',
            name='set_order',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='personalworkouts',
            name='weight',
            field=models.FloatField(),
        ),
        migrations.AlterField(
            model_name='personalworkouts',
            name='workout_name',
            field=models.CharField(max_length=255),
        ),
        migrations.AlterField(
            model_name='personalworkouts',
            name='workout_notes',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
