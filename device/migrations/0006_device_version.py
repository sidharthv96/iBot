# -*- coding: utf-8 -*-
# Generated by Django 1.11.11 on 2018-03-24 03:19
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('device', '0005_auto_20180324_0038'),
    ]

    operations = [
        migrations.AddField(
            model_name='device',
            name='version',
            field=models.IntegerField(default=0),
        ),
    ]
