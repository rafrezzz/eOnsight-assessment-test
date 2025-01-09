from rest_framework import serializers
from .models import Bridge

class BridgeSerializer(serializers.ModelSerializer):
    """
    A serializer class to convert the Bridge model instances into JSON format.
    """
    class Meta:
        model = Bridge
        fields = '__all__'