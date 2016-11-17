from django.shortcuts import render
from django.http import HttpResponse
# Create your views here.

def index(request):
#    return HttpResponse("Rango says hey there partner!")
    if not request.session.exists(request.session.session_key):
        request.session.create()
    print request.session.session_key
    return render(request, 'index.html')
def upload(request):
    return render(request,'upload.html')