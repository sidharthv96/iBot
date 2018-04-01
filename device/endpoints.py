from django.conf.urls import include, url
from rest_framework import routers

from .api import SensorViewSet

router = routers.DefaultRouter()
router.register('sensors', SensorViewSet)

urlpatterns = [
    url("^", include(router.urls)),
]
