from rest_framework import serializers

from .models import Sensor, Actuator, Parameter



class SensorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sensor
        fields = ('id', 'name', 'code', 'last_seen', 'data', 'state', 'version', 'value', 'events')