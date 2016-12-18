<<<<<<< HEAD
from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.template.response import TemplateResponse
from signup.inputdetails import data1
from login.logincheck import LoginCheck
from django.template import loader, Context
from copyloftapp.models import InputData,Linkaddress
from django.http import JsonResponse
=======
from django.shortcuts import render
from django.http import HttpResponse,JsonResponse
from django.views.decorators.csrf import csrf_exempt
import models
import uuid,boto3,json,os
from Cart.UploadImage import UploadImageClass
>>>>>>> refs/remotes/amnox/master
# Create your views here.



def index(request):
#    return HttpResponse("Rango says hey there partner!")
    if not request.session.exists(request.session.session_key):
        request.session.create()
<<<<<<< HEAD
    print request.session.session_key

=======
    #print request.session.session_key
>>>>>>> refs/remotes/amnox/master
    return render(request, 'index.html')
def cart_creation(request):
    if not request.session.exists(request.session.session_key):
        request.session.create()
    
    return render(request,'upload.html')
@csrf_exempt
def upload(request):
<<<<<<< HEAD
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

=======
    if request.method == "POST":
        data = {'status': 'success'}
        response=JsonResponse(data)
        print (request.FILES)
        fuck=UploadImageClass()
        fuck.hot()
        return response

def sign_s3(request,butt,fuck):
    
    file_name = butt
    file_type = fuck
    buck=''
    
    if(os.environ.get('S3_BUCKET')==None):
        s3R = boto3.resource('s3')
        
        for bucket in s3R.buckets.all():
            buck=bucket.name
            break
    else:
        buck=os.environ.get('S3_BUCKET')
    s3 = boto3.client('s3')
    presigned_post = s3.generate_presigned_post(
        Bucket = buck,
        Key = file_name,
        Fields = {"acl": "public-read", "Content-Type": file_type},
        Conditions = [
          {"acl": "public-read"},
          {"Content-Type": file_type}
        ],
        ExpiresIn = 3600
    )
    response=json.dumps({
        'data': presigned_post,
        'url': 'https://%s.s3.amazonaws.com/%s' % (buck, file_name)
    })
    print response
    return HttpResponse(response)
    #return JsonResponse({})
    
>>>>>>> refs/remotes/amnox/master
