# Generated by Django 4.1.4 on 2022-12-25 11:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("movies", "0004_rename_moviewatch_moviesession"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="movie",
            name="upload",
        ),
        migrations.AddField(
            model_name="movie",
            name="url",
            field=models.FileField(
                default="none", upload_to="movies", verbose_name="url"
            ),
            preserve_default=False,
        ),
    ]
