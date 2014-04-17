---
layout: post
title: Avoid spyware by running applications with SetSAFER
date: '2007-10-30T12:05:28+00:00'
tags: []
tumblr_url: http://vandragt.com/post/22188856285/avoid-spyware-by-running-applications-with-setsafer
---
Everybody who’s ever tried it knows the problem. Life as a regular user on Windows is a pain: who wants to switch users just to install software, sometimes even to run it? However running software as a non-admin increases security. It’s impossible for spyware to install itself into the system when it is not allowed to.

Using SetSAFER, a program created by Microsoft employee Michael Howard we can run just any applications as a regular or limited user, while still using an administrator account. After testing for side effects, which I explain below, I recommend you give this a try. I no longer have to run a realtime spyware scanner, and now just schedule routine scans.

As one of the articles Michael has written on the subject is not available anymore I’ll quote the nonadmin site for an complete explanation of the program:
SetSAFER is a policy-setting tool written by Michael Howard that can force applications to always run with lower privileges. You can download it and read about it in his MSDN article “Browsing the Web and Reading E-mail Safely as an Administrator, Part 2”.

For example, you could mark you favourite  browser to always run as a user, regardless of whether it starts by invoking an URL on the desktop, a link in email, a newly spawned browser and so on.
SetSAFER uses the SetSAFER.xml file to configure the applications that should be run with lower privileges. You can edit this with any text editor such as notepad to add applications and even folders. My configuration can be found below. This way I run my browsers, e-mail software and messengers without worrying about spyware:

<?xml version="1.0" encoding="UTF-8"?>
<safer>
<app comment="Internet Explorer" path="c:\program files\internet explorer" user="true" />
<app comment="Mozilla Firefox" path="c:\program files\mozilla firefox" user="true" />
<app comment="Opera 9.5 Alpha" path="c:\program files\opera 9.5 alpha\opera.exe" user="true" />
<app comment="Outlook" path="c:\program files\microsoft office\office12\outlook.exe " user="false" />
<app comment="Outlook Express" path="c:\program files\outlook express" user="true" />
<app comment="Windows Messenger" path="c:\program files\messenger" user="true" />
<app comment="Windows Live Messenger" path="c:\program files\windows live\messenger" user="true" />
</safer>
Side Effects
Some applications are not built to run in a mixed privileges environment and seem to cause issues when run like this. However, this is not SetSAFERs fault as it just uses the built-in windows policy settings!

Google Desktop and Google Toolbar for Internet Explorer monitor the browser history for pages that are visited and add them to their database. I assume this is not allowed as a regular user. Whatever the reason, it causes the browser to freeze whenever you go to a webpage. I’ve uninstalled Google Toolbar and Google Desktop until I have found a solution. Any help would be appreciated.

The website for Windows Update and Microsoft Update and certain Java applets will not  function if the user is not an administrator. This can be a pain if you want to manually check for updates. The solution: navigate to the installation folder for Internet Explorer (c:\program files\internet explorer ) and copy the iexplore.exe program to another location. The copy will run with full rights.

Finally, any program started from another application inherits the security settings from the parent program. This means that installations run directly from the browser will run with lower privileges. They’ll let you know you do not have enough rights to install it. This is intended and exactly what we want: a secure browsing environment. However, it might prove a slight annoyance at first. Just browse to the file yourself and run it yourself.
Downloads and Resources
 Download SetSAFER with my configuration. (it requires the .NET Framework 2.0)
	If you prefer you can download SetSAFER directly on the author’s website.
