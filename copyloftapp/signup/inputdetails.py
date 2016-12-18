from copyloftapp.models import InputData,Linkaddress
from django import forms
from django.utils.translation import ugettext_lazy as _


import uuid
class data1:
    cust_id =""
    f_name =''
    l_name =''
    email =''
    number =''
    address =''
    password = ""
    def __init__(self,request):
        if request.method == 'POST':
            self.cust_id = uuid.uuid4()
            self.f_name = request.POST.get("form-first-name", "")
            self.l_name = request.POST.get("form-last-name", "")
            self.email = request.POST.get("form-email", "")
            self.number = request.POST.get("form-number", "")
            self.address = request.POST.get("form-address", "")
            self.password = request.POST.get("form-password", "")
            inputdata= InputData(unique_id=self.cust_id,first_name=self.f_name,last_name=self.l_name,email_id=self.email,mobile_number=self.number,password=self.password)
            linkaddress = Linkaddress(unique_id=self.cust_id, address=self.address)
            inputdata.save()
            linkaddress.save()
            self.emailcheck()


    def emailcheck(self):
        if InputData.objects.filter(email_id__iexact=self.email):
            print "This email address is already in use. Please supply a different email address."




