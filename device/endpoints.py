from django.conf.urls import include, url
from rest_framework import routers

from device.api import ActuatorViewSet, RuleViewSet
from .api import SensorViewSet

router = routers.DefaultRouter()
router.register('sensors', SensorViewSet)
router.register('actuators', ActuatorViewSet)
router.register('rules', RuleViewSet)

urlpatterns = [
    url("^", include(router.urls)),
]
