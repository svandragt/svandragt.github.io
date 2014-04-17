---
layout: post
title: Windows Integration Authentication Scheduled Web Page
date: '2010-08-31T10:49:08+00:00'
tags: []
tumblr_url: http://vandragt.com/post/22188877048/windows-integration-authentication-scheduled-web-page
---
This is a problem I have been trying to solve for some time on and off. Under Windows/IIS I need to periodically run a webpage that uses Windows Integrated Authentication. This rules out most of the VBS scripts and WGet solutions. I got it to work today using a batch file like below. Just add it as a scheduled task.

start /min "C:\Program Files\Internet Explorer\iexplore.exe" http://domain.com/webpage
PING 1.1.1.1 -n 60 -w 60000 > NUL
taskkill /F /IM iexplore.exe

The two most important parts is starting the application with the ‘start’ command (windows 2003 server in this case) so that the batch file will continue while the program is running. We then use a trick by pinging every second for 60 seconds (1 minutes) to wait for the webpage to finish what it’s doing. Finally we kill off the original program.
