from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BridgeViewSet

router = DefaultRouter()
router.register(r'bridges', BridgeViewSet)

urlpatterns = [
    path('', include(router.urls)),
]