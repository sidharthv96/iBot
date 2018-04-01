# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin

# Register your models here.
from django.contrib.admin.decorators import register

from device.models import *


@register(Sensor)
class SensorAdmin(admin.ModelAdmin):
    list_display = ['id', 'code', 'name', 'last_seen', 'data', 'value', 'state']


@register(Actuator)
class ActuatorAdmin(admin.ModelAdmin):
    list_display = ['id', 'code', 'name', 'last_seen', 'data', 'state']


@register(Parameter)
class ParameterAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'value']
