# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from device.models import *


# Create your models here.


class Event(models.Model):
    name = models.CharField(max_length=200, default="")
    sensor = models.ForeignKey(Sensor, on_delete=models.CASCADE)
    parameter = models.CharField(max_length=200)
    
    def __str__(self):
        return self.name + " | " + self.sensor.name + " | " + self.parameter


class Action(models.Model):
    name = models.CharField(max_length=200, default="")
    actuator = models.ForeignKey(Actuator, on_delete=models.CASCADE)
    parameter = models.CharField(max_length=200)

    def __str__(self):
        return self.name + " | " + self.actuator.name + " | " + self.parameter


class Rule(models.Model):
    name = models.CharField(max_length=200, default="")
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    action = models.ForeignKey(Action, on_delete=models.CASCADE)

    def __str__(self):
        return self.name
