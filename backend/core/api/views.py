from rest_framework import viewsets, serializers
from django.db import transaction
from django.db.models import Count
from django.db.models.functions import TruncDate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import SAFE_METHODS, BasePermission
from core.models import Libro, Genero, Prestamo, User
from .serializers import LibroSerializer, GeneroSerializer, PrestamoSerializer, RegistroSerializer, MyTokenObtainPairSerializer, UserSerializer, UpdateUserSerializer

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

class UserViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAdminOrReadOnly]
    queryset = User.objects.all()

    def get_serializer_class(self):
        # Cuando se hace un POST (crear usuario)
        if self.action == 'create':
            return RegistroSerializer
        # Cuando se hace un PUT o PATCH (Actualizar)
        if self.action in ['update','partial_update']:
            return UpdateUserSerializer
        # Cuando se hace un GET (Listar o ver detalles)
        return UserSerializer

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
    serializer_class = PrestamoSerializer

    def perform_create(self, serializer):

        book = serializer.validated_data['libro']

        with transaction.atomic():
            if book.cantidad > 0:
                book.cantidad -= 1
                book.save()

                serializer.save()
            else:
                raise serializers.ValidationError(
                    "No hay ejemplares disponibles de este libro"
                )

    def perform_update(self, serializer):

        instancia_previa = self.get_object()
        estado_anterior = instancia_previa.devuelto

        prestamo_actualizado = serializer.save()
        nuevo_estado = prestamo_actualizado.devuelto

        if not estado_anterior and nuevo_estado:
            with transaction.atomic():
                book = prestamo_actualizado.libro
                book.cantidad += 1
                book.save()
        
    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            # El admin ve todos los préstamos de la biblioteca
            return Prestamo.objects.all()
        # El usuario normal SOLO ve sus propios préstamos
        return Prestamo.objects.filter(usuario=user)

# Vista para las estadisticas del dashboard
class DashBoardStatsView(APIView):
    def get(self,request):
        return Response({
            "libros": Libro.objects.count(),
            "Prestamos": Prestamo.objects.count(),
            "usuarios": User.objects.count(),
        })
    

class GraficoStatsView(APIView):
    def get(self, request):
        # Obtener el conteo de prestamos de ultimos 7 dias
        prestamos_data = (
            Prestamo.objects
            .annotate(fecha=TruncDate('fecha_inicio'))
            .values('fecha')
            .annotate(total=Count('id'))
            .order_by('fecha')[:7]
        )

        ususarios_data = (
            User.objects
            .annotate(fecha=TruncDate('date_joined'))
            .values('fecha')
            .annotate(total=Count('id'))
            .order_by('fecha')[:7]
        )

        return Response({
            "prestamos": list(prestamos_data),
            "usuarios": list(ususarios_data),
        })
    
class RecentStatsView(APIView):

    def get(self, request):

        recent_users = (
            User.objects.order_by('-date_joined')[:5]
            .values('id', 'username', 'date_joined')
        )

        recent_loans = (
            Prestamo.objects.select_related('libro', 'usuario')
            .order_by('-id')[:5]
        )

        loans_recent_data = [{
            "id": p.id,
            "libro": p.libro.titulo,
            "usuario": p.usuario.username,
            "devuelto": p.devuelto
        } for p in recent_loans]

        return Response({
            "usuarios_recientes": list(recent_users),
            "prestamos_recientes": loans_recent_data
        })