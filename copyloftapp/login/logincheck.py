from copyloftapp.models import InputData
from django.core import serializers
from django.shortcuts import render, redirect
from django.http import HttpResponse

class LoginCheck:
    new=""
    new2=""
    value=""

    def checkhere(self, request):
        if 'unique_id' in request.session:
            print "you are authenticated user"
            return True
        else:
            print 'you are not'
            if request.method == 'POST':
               self.new = request.POST.get('form-email-login')
               self.new2 = request.POST.get('form-password-login')
            data = InputData.objects.all()
            for e in data:
                if e.email_id == self.new and e.password == self.new2:
                    getvalue = InputData.objects.filter(email_id__iexact=self.new)
                    for asi in getvalue:
                        request.session['unique_id'] = asi.password
                    print request.session['unique_id']
                    return True
                else:
                    print "fuck you "
                    return False