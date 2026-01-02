from rest_framework import viewsets, mixins
from rest_framework.permissions import SAFE_METHODS, BasePermission
from core.models import Libro, Genero, Prestamo, User
from .serializers import LibroSerializer, GeneroSerializer, PrestamoSerializer, RegistroSerializer, MyTokenObtainPairSerializer

from rest_framework_simplejwt.views import TokenObtainPairView

# Modifica el serializador del token
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

# Permiso personalizado donde separa los usuarios del admin
class IsAdminOrReadOnly(BasePermission):
    message =  'Editar o subir datos solo esta permitido para el administrador'

    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        return bool(request.user and request.user.is_staff)

class LibroViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAdminOrReadOnly]
    queryset = Libro.objects.all()
    serializer_class = LibroSerializer

class GeneroViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAdminOrReadOnly]
    queryset = Genero.objects.all()
    serializer_class = GeneroSerializer

class PrestamoViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAdminOrReadOnly]
    queryset = Prestamo.objects.all()
    serializer_class = PrestamoSerializer

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            # El admin ve todos los préstamos de la biblioteca
            return Prestamo.objects.all()
        # El usuario normal SOLO ve sus propios préstamos
        return Prestamo.objects.filter(usuario=user)

class RegistroViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    permission_classes = [IsAdminOrReadOnly]
    queryset = User.objects.all()
    serializer_class = RegistroSerializer