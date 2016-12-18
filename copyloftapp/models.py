from __future__ import unicode_literals
import uuid
from django.db import models
from django.utils import timezone
from datetime import datetime


# Create your models here.

class InputData( models.Model ):
    unique_id = models.UUIDField(primary_key=True,blank=True ,editable=True)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
<<<<<<< HEAD
    email_id = models.EmailField()
    password = models.CharField(max_length=30,default=None)
    mobile_number = models.TextField()
    created_on =models.DateTimeField(default=datetime.now, blank=True)
    def __str__(self):
        return self.email_id , self.password
    class Meta:
            db_table = 'inputdata'

class Linkaddress(models.Model):
    unique_id = models.UUIDField(primary_key=True, blank=True , editable=True)
    address = models.TextField(default=None, blank=True, null=True)
    created_on =models.DateField(default=timezone.now)
    class Meta:
        db_table = 'linkaddress'
=======

class Cart(models.Model):
    MODES = (
        ('L', 'login'),
        ('S', 'session'),
    )
    user = models.ForeignKey(
    Person,
    on_delete=models.CASCADE,
    verbose_name="Type of check-in",
    )
    cart_id = models.UUIDField()
    created_time=models.DateTimeField(auto_now_add=True, blank=True)
    creation_mode=models.CharField(
        max_length=1,
        choices=MODES,
        default='S',)
    
>>>>>>> refs/remotes/amnox/master
