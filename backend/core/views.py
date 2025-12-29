from django.shortcuts import render

# Create your views here.
from rest_framework.response import Response
from rest_framework.decorators import api_view

@api_view(['GET'])
def prueba_api(request):
    return Response({"mensaje": "¡Conexión establecida con éxito, Humberto!"})