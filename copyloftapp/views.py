from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.template.response import TemplateResponse
from signup.inputdetails import data1
from login.logincheck import LoginCheck
from django.template import loader, Context
from copyloftapp.models import InputData,Linkaddress
from django.http import JsonResponse
# Create your views here.



def index(request):
#    return HttpResponse("Rango says hey there partner!")
    if not request.session.exists(request.session.session_key):
        request.session.create()
    print request.session.session_key

    return render(request, 'index.html')
def upload(request):
    return render(request,'upload.html')

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
        return redirect('signup')
    else:
        return render(request,'login.html')

def validate_username(request):
    print "rkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk"
    if request.method == 'POST':
        username = request.POST.get('form-email', "")
        print username
        print request.POST.get('form-email', "")
        print request.body
        data = {
            'is_taken': InputData.objects.filter(email_id__iexact=username).exists()
        }
        print "hello"
        print "hello"
        print data
        return JsonResponse(data)

def example(request):
    context = {}
    return render(request, 'trial.html', context)

#chewt
