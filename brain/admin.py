# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin

# Register your models here.
from django.contrib.admin.decorators import register

from brain.models import *


@register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ['id', 'sensor', 'parameter']


@register(Action)
class ActionAdmin(admin.ModelAdmin):
    list_display = ['id', 'actuator', 'parameter']


@register(Rule)
class RuleAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'action', 'event']


