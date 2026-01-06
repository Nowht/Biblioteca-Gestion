from django.urls import path
from rest_framework.routers import DefaultRouter
from core.api.views import LibroViewSet, GeneroViewSet, PrestamoViewSet, RegistroViewSet, UserViewSet,DashBoardStatsView, GraficoStatsView

router = DefaultRouter()
router.register('users', UserViewSet, basename='users')
router.register('libro', LibroViewSet, basename='libro' )
router.register('genero', GeneroViewSet, basename='genero' )
router.register('prestamo', PrestamoViewSet, basename='prestamo' )
router.register('registro', RegistroViewSet, basename='registro' )

# Las URLs del router se combinan con las URLs manuales
urlpatterns = [
    # Registramos la APIView manualmente usando .as_view()
    path('dashboard-stats/', DashBoardStatsView.as_view(), name='dashboard-stats'),
    path('chart-stats/', GraficoStatsView.as_view(), name='chart-stats'),
]

# Sumamos las rutas del router a nuestra lista de urlpatterns
urlpatterns += router.urls