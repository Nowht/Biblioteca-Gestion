from rest_framework.routers import DefaultRouter
from core.api.views import *

router = DefaultRouter()
router.register('libro', LibroViewSet, basename='libro' )
router.register('genero', GeneroViewSet, basename='genero' )
router.register('prestamo', PrestamoViewSet, basename='prestamo' )
router.register('registro', RegistroViewSet, basename='registro' )

urlpatterns = router.urls
