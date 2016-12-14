from copyloftapp import views  # @UnresolvedImport
from django.conf.urls import url

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^createitem/$', views.cart_creation, name='create'),
    url(r'^createitem/upload/$', views.upload, name='fileupload'),
    url(r'^createitem/upload/sign_s3/(.*?)/(.*)$', views.sign_s3, name='signatureS3'),
]