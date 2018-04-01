from rest_framework import serializers

from .models import Sensor, Actuator


class SensorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sensor
        fields = ('id', 'name', 'code', 'last_seen', 'data', 'state', 'version', 'value', 'events')


class ActuatorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Actuator
        fields = ('id', 'name', 'code', 'last_seen', 'data', 'state', 'version', 'actions')
