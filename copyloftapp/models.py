from __future__ import unicode_literals

from django.db import models

# Create your models here.
class Person(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)

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
    
