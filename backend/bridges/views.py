from django.shortcuts import render
from rest_framework import viewsets
from .models import Bridge
from .serializers import BridgeSerializer

class BridgeViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows bridges to be viewed or edited.
    """
    queryset = Bridge.objects.all()
    serializer_class = BridgeSerializer