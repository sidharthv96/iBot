# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.utils import timezone


class Device(models.Model):
    name = models.CharField(max_length=200, default="")
    code = models.CharField(max_length=200, unique=True)
    last_seen = models.DateTimeField(default=timezone.now)
    data = models.CharField(max_length=200, default="", null=True)
    state = models.BooleanField(default=False)
    version = models.IntegerField(default=0)

    def __unicode__(self):
        return self.name + " " + self.code


class Parameter(models.Model):
    name = models.CharField(max_length=200, default="")
    value = models.CharField(max_length=200, default="")
    variable = models.BooleanField(default=False)

    def __unicode__(self):
        return self.name


class Sensor(Device):
    value = models.FloatField(default=0, null=True)
    events = models.ManyToManyField(Parameter)


class Actuator(Device):
    actions = models.ManyToManyField(Parameter)
