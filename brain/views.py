# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import json
import socket
from datetime import timedelta

from django.http.response import HttpResponse
from django.shortcuts import redirect, render

from brain.models import *
from device.models import *


def get_ip():
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        s.connect(('10.255.255.255', 1))
        IP = s.getsockname()[0]
    except:
        IP = '127.0.0.1'
    finally:
        s.close()
    return IP


last_check = timezone.now()


def refresh(request):
    global last_check
    dev = Device.objects.get(code=request.GET.get("code"))
    dev.last_seen = timezone.now()
    dev.state = True;
    dev.save()

    if timezone.now() > last_check + timedelta(seconds=3):
        print("Ch3ck3d")
        devs = Device.objects.filter(last_seen__lt=timezone.now() - timedelta(seconds=3))
        for d in devs:
            d.state = False
            d.save()
        last_check = timezone.now()

    return HttpResponse(dev.data or "OK")


def state(request):
    dev = Actuator.objects.get(code=request.GET.get("code"))
    return HttpResponse(dev.data)


def toggle(val):
    if val.lower() == "true" or val.lower() == "on" or int(val) > 0:
        return 0
    return 1


def signal(request):
    # if True:
    #     return HttpResponse("OK")
    sensor = Sensor.objects.get(code=request.GET.get("code"))
    sensor.data = request.GET.get("data")
    sensor.value = float(request.GET.get("value") or 0)
    sensor.last_seen = timezone.now()
    sensor.state = True
    sensor.save()
    events = Event.objects.filter(sensor=sensor)
    for event in events:
        print(event.parameter)
        print(sensor.data, sensor.value)
        print(eval(event.parameter))
        if eval(event.parameter):
            rule = Rule.objects.filter(event=event).order_by("-pk").first()
            action = rule.action
            actuator = action.actuator
            parameter = action.parameter
            print(actuator.name, actuator.code)
            print(parameter)
            exec(parameter)
            actuator.save()

    return HttpResponse("OK")


def add_rule(request):
    if request.method == "GET":
        ret = {'sensors': Sensor.objects.all(
        ), 'actuators': Actuator.objects.all()}
        return render(request, "add_rule.html", ret)
    print(request.POST)
    print(request.body)
    req = request.POST
    sensor = Sensor.objects.get(pk=req.get("sensor"))
    actuator = Actuator.objects.get(pk=req.get("actuator"))
    sensor_event = Parameter.objects.get(pk=req.get("sensor_event"))
    actuator_action = Parameter.objects.get(pk=req.get("actuator_action"))
    sensor_p = sensor_event.value
    if sensor_event.variable:
        sensor_p = req.get("sensor_value")
    event = Event.objects.get_or_create(sensor=sensor, parameter=sensor_p)[0]
    actuator_p = actuator_action.value
    if actuator_action.variable:
        actuator_p = req.get("actuator_value")
    action = Action.objects.get_or_create(
        actuator=actuator, parameter=actuator_p)[0]
    rule = Rule.objects.get_or_create(event=event, action=action)[0]
    rule.name = req.get("name")
    rule.save()
    return redirect("/rule/add/")


def view_rules(request):
    return render(request, "home.html")


def joystick(request):
    ret = {}
    return render(request, "joystick.html", ret)


def get_options(request):
    pk = request.GET.get("pk")
    t = request.GET.get("type")
    opt = ""
    if t == "sensor":
        sensor = Sensor.objects.get(pk=pk)
        for event in sensor.events.all():
            opt += "<option value={pk} data-var={variable}>{name}</option>\n".format(
                pk=event.pk, variable=event.variable, name=event.name)
    elif t == "actuator":
        actuator = Actuator.objects.get(pk=pk)
        for action in actuator.actions.all():
            opt += "<option value={pk} data-var={variable}>{name}</option>\n".format(
                pk=action.pk, variable=action.variable, name=action.name)
    return HttpResponse(opt)


def get_json_options(request):
    pk = request.GET.get("pk")
    t = request.GET.get("type")
    ret = []
    if t == "sensor":
        sensor = Sensor.objects.get(pk=pk)
        for event in sensor.events.all():
            ret.append({"value": event.pk, "text": event.name})
    elif t == "actuator":
        actuator = Actuator.objects.get(pk=pk)
        for action in actuator.actions.all():
            ret.append({"value": action.pk, "text": action.name})

    return HttpResponse(json.dumps(ret))
