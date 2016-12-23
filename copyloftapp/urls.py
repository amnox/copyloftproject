from copyloftapp import views,login_views # @UnresolvedImport
from django.conf.urls import  url

urlpatterns = [
    url(r'^$', login_views.index, name='index'),
    url(r'^signup/$', login_views.signup, name='signup'),
    url(r'^signup/signupcheck$', login_views.aftersignup, name='signupcheck'),
    url(r'^login/$', login_views.login, name='login'),
    url(r'^login/logincheck$', login_views.logincheck, name='logincheck'),
    url(r'^createitem/$', views.cart_creation, name='create'),
    url(r'^createitem/upload/$', views.upload, name='fileupload'),
    url(r'^createitem/upload/sign_s3/(.*?)/(.*)$', views.sign_s3, name='signatureS3'),
    url(r'^trial/$', views.example, name='trial'),

]