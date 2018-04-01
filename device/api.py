from rest_framework import viewsets, permissions

from device.serializers import ActuatorSerializer
from .models import Sensor, Actuator
from .serializers import SensorSerializer


class SensorViewSet(viewsets.ModelViewSet):
    queryset = Sensor.objects.all()
    permission_classes = [permissions.AllowAny, ]
    serializer_class = SensorSerializer


class ActuatorViewSet(viewsets.ModelViewSet):
    queryset = Actuator.objects.all()
    permission_classes = [permissions.AllowAny, ]
    serializer_class = ActuatorSerializer
