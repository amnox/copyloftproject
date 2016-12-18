from copyloftapp import views  # @UnresolvedImport
from django.conf.urls import  url

urlpatterns = [
    url(r'^$', views.index, name='index'),
<<<<<<< HEAD
    url(r'^signup/$', views.signup, name='signup'),
    url(r'^createitem/upload/$', views.upload, name='create'),
    url(r'^signup/signupcheck$', views.aftersignup, name='signupcheck'),
    url(r'^login/$', views.login, name='login'),
    url(r'^login/logincheck$', views.logincheck, name='logincheck'),
    url(r'^signup/ajax/validate_username/$', views.validate_username, name='validate_username'),
    url(r'^trial/$', views.example, name='trial'),
=======
    url(r'^createitem/$', views.cart_creation, name='create'),
    url(r'^createitem/upload/$', views.upload, name='fileupload'),
    url(r'^createitem/upload/sign_s3/(.*?)/(.*)$', views.sign_s3, name='signatureS3'),
>>>>>>> refs/remotes/amnox/master
]