from copyloftapp import views  # @UnresolvedImport
from django.conf.urls import url

urlpatterns = [
    url(r'^$', views.index, name='index'),  
]