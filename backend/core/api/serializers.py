from rest_framework import serializers
from django.contrib.auth.models import User
from core.models import *
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Añadimos datos personalizados al TOKEN (se guardan dentro del JWT)
        token['username'] = user.username
        token['is_staff'] = user.is_staff
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        
        # Añadimos datos personalizados a la RESPUESTA JSON (fácil acceso para React)
        data['is_staff'] = self.user.is_staff
        data['username'] = self.user.username
        return data

# Serializador del registro de usuarios
class RegistroSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'password', 'is_staff']

    # Funcion que ignresa los datos en el modelo usuario
    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            is_staff=validated_data.get('is_staff', False)
        )
        return user
    
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']

class GeneroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genero
        fields = '__all__'

class LibroSerializer(serializers.ModelSerializer):

    genero_nombre = serializers.ReadOnlyField(source='genero.nombre')

    class Meta:
        model = Libro
        fields = '__all__'

class PrestamoSerializer(serializers.ModelSerializer):

    usuario = UserSerializer(read_only=True)
    libro = LibroSerializer(read_only=True)

    class Meta:
        model = Prestamo
        fields = '__all__'
