#! /usr/bin/env python
# coding=utf-8
'''
Created on 2012-9-4

@author: ezioruan
'''
from django.conf.urls.defaults import patterns,url

urlpatterns = patterns('b2b.views',
                       url(r'^$','index')
                       )
