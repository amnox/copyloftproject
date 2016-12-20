from django.shortcuts import render,redirect
from django.http import HttpResponse,JsonResponse
from django.views.decorators.csrf import csrf_exempt
import models
import uuid,boto3,json,os
from signup.inputdetails import data1
from login.logincheck import LoginCheck
from django.template import loader, Context
from models import InputData,Linkaddress
from Cart.UploadImage import UploadImageClass

# Create your views here.

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
        return redirect('signup')
    else:
        return render(request,'login.html')
def cart_creation(request):
    if not request.session.exists(request.session.session_key):
        request.session.create()
    
    return render(request,'upload.html')
@csrf_exempt
def upload(request):
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

def example(request):
    context = {}
    return render(request, 'trial.html', context)