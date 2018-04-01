from rest_framework import viewsets, permissions

from .models import Sensor, Actuator, Parameter
from .serializers import SensorSerializer


class SensorViewSet(viewsets.ModelViewSet):
    queryset = Sensor.objects.all()
    permission_classes = [permissions.AllowAny, ]
    serializer_class = SensorSerializer