# Generated by Django 5.1.5 on 2025-02-23 08:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gallery', '0003_comment'),
    ]

    operations = [
        migrations.AddField(
            model_name='mediafile',
            name='view_count',
            field=models.PositiveBigIntegerField(default=0),
        ),
    ]
