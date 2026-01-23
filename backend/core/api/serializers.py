from rest_framework import serializers
from django.contrib.auth.models import User
from core.models import *
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Añadimos datos personalizados al TOKEN (se guardan dentro del JWT)
        token['id'] = user.id
        token['username'] = user.username
        token['is_staff'] = user.is_staff
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        
        # Añadimos datos personalizados a la RESPUESTA JSON (fácil acceso para React)
        data['id'] = self.user.id
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

class UpdateUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = User
        fields = ['username', 'password', 'is_staff']

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        if password:
            instance.set_password(password)

        instance.save()
        return instance

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'is_staff', 'date_joined']

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

    class Meta:
        model = Prestamo
        fields = '__all__'

    def to_representation(self, instance):
        
        data = super().to_representation(instance)

        data['usuario_nombre'] = instance.usuario.username if instance.usuario else "Usuario no encontrado"
        data['libro_detalle'] = instance.libro.titulo if instance.libro else "Libro no encontrado"

        return data