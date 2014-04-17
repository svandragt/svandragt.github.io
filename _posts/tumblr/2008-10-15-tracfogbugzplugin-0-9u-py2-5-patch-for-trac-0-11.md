---
layout: post
title: TracFogbugzPlugin 0.9u-py2.5 Patch for Trac 0.11
date: '2008-10-15T12:59:39+00:00'
tags: []
tumblr_url: http://vandragt.com/post/22188871224/tracfogbugzplugin-0-9u-py2-5-patch-for-trac-0-11
---
If you use both VisualSvn + Trac (or another flavour of Subversion and Trac), and tried to integrate them with Fogbugz , you will have tried the TracFogbugzPlugin.

Trying to get this to work isn’t straightforward as it’s not compatible with Trac 0.11. You will come across the following error:
Traceback (most recent call last):
File “C:\Python25\Lib\site-packages\trac\web\api.py”, line 339, in
send_error
‘text/html’)
File “C:\Python25\Lib\site-packages\trac\web\chrome.py”, line 684, in
render_template
data = self.populate_data(req, data)
File “C:\Python25\Lib\site-packages\trac\web\chrome.py”, line 592, in
populate_data
d[‘chrome’].update(req.chrome)
File “C:\Python25\Lib\site-packages\trac\web\api.py”, line 168, in
__getattr__
value = self.callbacks[name](self)
File “C:\Python25\Lib\site-packages\trac\web\chrome.py”, line 460, in
prepare_request
for category, name, text in contributor.get_navigation_items(req):
File
“c:\Python25\lib\site-packages\tracfogbugzplugin-0.9u-py2.5.egg\fogbugz\fogb
ugz.py”, line 22, in get_navigation_items
yield ‘mainnav’, ‘fogbugz’, Markup(‘<a href=”%s”>FogBuz</a>’,
self.baseurl)
LookupError: unknown encoding: >/”>https://«myurl»/
To fix this line 22 needs changed, to read:
yield ‘mainnav’, ‘fogbugz’, Markup(‘<a href=”%s”>FogBuz</a>’%self.baseurl)
Or download the file below and use it as part of the installation instructions (if this is your first Python Egg you want to read about installing Trac plugins. ;)

Now it is loading but the plugin doesn’t seem to work, haha.

Download: Patched tracfogbugzplugin-09u-py25
