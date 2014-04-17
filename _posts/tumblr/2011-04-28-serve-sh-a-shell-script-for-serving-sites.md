---
layout: post
title: Serve.sh - A shell script for serving sites
date: '2011-04-28T11:15:40+00:00'
tags: []
tumblr_url: http://vandragt.com/post/22188890391/serve-sh-a-shell-script-for-serving-sites
---
I am experimenting with using a Linux virtual machine as my web development environment of choice. I store the vm on a removable drive so that I can develop from any location, without having to setup a working environment. Previously I had to check out the repositories, setup a local webserver and I had trouble keeping things working, because every configuration change had to be applied in every location. Now it is all centralized and my life is simpler.

The aim is to make working on projects as easy as possible. I have all projects checked out in a folder called /var/sites. They are mostly PHP projects and because of my shared hosting environment they share a single apache configuration. How can I easily serve them? Having seperate virtualhosts for each project would result in me having to make manual changes on every location again, so this was not the way to go.

Instead I created a simple shell script that creates a symbolic link from the Apache’s webroot to the project I am working on:

[gallery link=”file”]

[shell]
#!/bin/bash
echo “Available sites:”
ls  /var/sites

echo
echo -n “Type site to serve: “
read site
if [ -z “$site” ]
then
exit
fi

sudo rm /var/www
sudo ln -s /var/sites/$site /var/www

[/shell]
