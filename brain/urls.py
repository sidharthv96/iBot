"""ibot URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url

from brain.views import *
from device.views import *

urlpatterns = [

    url(r'^refresh/', refresh),
    url(r'^signal/', signal),
    url(r'^state/', state),
    url(r'^test/', test),
    url(r'^joystick/', joystick),
    url(r'^options/json', get_json_options),
    url(r'^options/', get_options),
    # url(r'^rule/add/', add_rule),
    url(r'^rule/view/', view_rules),

]
