from django.shortcuts import render,redirect
from django.http import HttpResponse,JsonResponse
from django.views.decorators.csrf import csrf_exempt
import models
from signup.inputdetails import data1
from login.logincheck import LoginCheck
from django.template import loader, Context
from models import InputData,Linkaddress


def index(request):
#    return HttpResponse("Rango says hey there partner!")
    if not request.session.exists(request.session.session_key):
        request.session.create()
    #print request.session.session_key
    return render(request, 'index.html')


def signup(request):
     return render(request,'signup.html')

def aftersignup(request):
        aftersignupobj = data1(request)
        return redirect('index')

def logincheck(request):
    if request.method == "POST":
        if LoginCheck().checkhere(request):
            return redirect('index')
        else:
            return redirect('login')
       # logincheckobk.loginuser(request)
    else:
        return redirect('login')



def login(request):
    if 'unique_id' in request.session:
        print "you are authenticated user"
        return redirect('index')
    else:
        return render(request,'login.html')