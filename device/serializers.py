from rest_framework import serializers

from brain.models import Rule
from .models import Sensor, Actuator


class SensorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sensor
        fields = ('id', 'name', 'code', 'last_seen', 'data', 'state', 'version', 'value', 'events')


class ActuatorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Actuator
        fields = ('id', 'name', 'code', 'last_seen', 'data', 'state', 'version', 'actions')


class RuleSerializer(serializers.ModelSerializer):
    event_name = serializers.RelatedField(source='event', read_only=True)

    class Meta:
        model = Rule
        fields = ('id', 'name', 'event_name')
