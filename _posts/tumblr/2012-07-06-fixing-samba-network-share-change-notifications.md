---
layout: post
title: ! 'Fixing Samba network-share change notifications '
date: '2012-07-06T13:35:20+00:00'
tags: []
tumblr_url: http://vandragt.com/post/26625236611/fixing-samba-network-share-change-notifications
---
Fixing Samba network-share change notifications Today a problem came up where the files on my Samba fileshare did not indicate to my Windows system that they were changed. Software that relies on this information such as TortoiseHG and SimpleLESS would not know that the file had changed. This was especially obvious with SimpleLESS which should take the .less file and process it, but wouldn’t.

It turns out that the  cause of this is that on the linux system the system time was off by a large margin. Using Arbab Nazar’s article on setting up time synchronization fixed the issue and prevents it from reoccurring.
