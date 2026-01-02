from django.db import models
from django.contrib.auth.models import User

class Genero(models.Model):
    nombre = models.CharField(max_length=100)

    def __str__(self):
        return self.nombre

class Libro(models.Model):
    ESTADO_CHOICES = [
        ('disponible', 'Disponible'),
        ('prestado', 'Prestado'),
        ('mantenimiento','Mantenimiento'),
    ]
    titulo = models.CharField(max_length=200)
    autor = models.CharField(max_length=200)
    isbn = models.CharField(max_length=13, unique=True)
    editorial = models.CharField(max_length=200)
    fecha_publicacion = models.DateField()
    portada = models.URLField(blank=True)
    cantidad = models.PositiveIntegerField(default=1)
    descripcion = models.TextField(blank=True, default="Sin descripción disponible")

    genero = models.ForeignKey(Genero, on_delete=models.SET_NULL, null=True)
    estado = models.CharField(max_length=20, choices=ESTADO_CHOICES, default='disponible')

    def __str__(self):
        return self.titulo
    
class Prestamo(models.Model):
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    libro = models.ForeignKey(Libro, on_delete=models.CASCADE)
    
    fecha_inicio = models.DateTimeField(auto_now_add=True)
    fecha_devolucion_esperada = models.DateField()
    fecha_entregado_real = models.DateField(null=True, blank=True)
    notas = models.TextField(blank=True, default="No hay observaciones")
    devuelto = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.libro.titulo} - {self.usuario.username}"