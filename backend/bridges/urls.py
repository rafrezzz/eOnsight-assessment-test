from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BridgeViewSet

# Create a router and register our viewset with it.
router = DefaultRouter()
router.register(r'bridges', BridgeViewSet)

urlpatterns = [
    path('', include(router.urls)), # routes to the viewset 
]