from rest_framework import viewsets, permissions

from brain.models import Rule
from device.serializers import ActuatorSerializer, RuleSerializer
from .models import Sensor, Actuator
from .serializers import SensorSerializer


class SensorViewSet(viewsets.ModelViewSet):
    queryset = Sensor.objects.all().order_by('-state')
    permission_classes = [permissions.AllowAny, ]
    serializer_class = SensorSerializer


class ActuatorViewSet(viewsets.ModelViewSet):
    queryset = Actuator.objects.all()
    permission_classes = [permissions.AllowAny, ]
    serializer_class = ActuatorSerializer


class RuleViewSet(viewsets.ModelViewSet):
    queryset = Rule.objects.all()
    permission_classes = [permissions.AllowAny, ]
    serializer_class = RuleSerializer
