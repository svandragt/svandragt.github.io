---
layout: post
title: Fixing Trac after upgrading VisualSVN
date: '2008-10-22T16:01:38+00:00'
tags: []
tumblr_url: http://vandragt.com/post/22188872526/fixing-trac-after-upgrading-visualsvn
---
If you upgraded VisualSVN Server like I have today to 1.61 and have Trac installed as per VisualSvn+Trac then you’ll notice Trac stopped working.

To fix this, follow this part of the instructions:
Add following line at the top of file C:\Program Files\VisualSVN Server\httpd-wrapper.bat:

set PYTHONHOME=%~dp0\Trac\python

Update: Later updates to VisualSvn Server break Trac.
