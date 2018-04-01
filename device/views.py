# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.http.response import HttpResponse
from django.shortcuts import render
from django.utils import timezone
from django.views.decorators.csrf import csrf_exempt

from device.models import *
import json


def test(request):
    return HttpResponse("SUCCESS")


@csrf_exempt
def register(request):
    if request.method == "GET":
        return HttpResponse("Register Device")
    # print(request.body)
    d = json.loads(request.body)
    print(d)
    if d['mode'] == "actuator":
        act, created = Actuator.objects.get_or_create(code=d['code'])
        if created:
            act.name = d['type']
        act.last_seen = timezone.now()
        act.save()
        if created or int(d['version']) > act.version:
            actions = d['actions']
            for x in actions:
                p, c = Parameter.objects.get_or_create(
                    name=d['type'] + "_" + x, value=actions[x])
                act.actions.add(p)
            act.save()
            print("Actuator Updated")
    elif d['mode'] == "sensor":
        sensor, created = Sensor.objects.get_or_create(code=d['code'])
        if created:
            sensor.name = d['type']
        sensor.last_seen = timezone.now()
        sensor.save()
        if created or int(d['version']) > sensor.version:
            events = d['events']
            for x in events:
                p, c = Parameter.objects.get_or_create(
                    name=d['type'] + "_" + x, value=events[x])
                sensor.events.add(p)
            p, c = Parameter.objects.get_or_create(
                name=d['type'] + "_custom", value="sensor.value = ", variable=True)
            sensor.events.add(p)
            sensor.save()
            print("Sensor Updated")
    return HttpResponse("Working")
