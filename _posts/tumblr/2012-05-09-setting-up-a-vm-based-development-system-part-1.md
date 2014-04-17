---
layout: post
title: Setting up  a VM based development system - Part 1
date: '2012-05-09T19:41:00+00:00'
tags: []
tumblr_url: http://vandragt.com/post/22725600355/setting-up-a-vm-based-development-system-part-1
---
I recently set up a local development server running Ubuntu on  VMware player. I thought it would be interesting to document the process and instructions so that it will be useful to others, and you can follow along / correct / improve this guide. On completion of this series you will end up with a complete LAMP local development system..

Installing Ubuntu

You will need:

Vmware player ( from vmware or if you don’t want to register: filehippo
Ubuntu
A Notetaker - I use Evernote
Install VMware player (VMP). Restart the pc if necessary.

I’m installing the virtual machine on my USB harddisk, this way I can take my whole development with me on the go (home/work) - this is great because you only have to set all this up once, instead of on every machine you plan to use it on.

Start VMP and “Create a New Virtual Machine” and browse to the downloaded .iso. As part of the Easy Install Information write down the login:

username: __________
password: __________


Store the VM on your removable drive.

On the Specify Disk Capacity screen you will want to go higher than the recommended disk size, I chose double (40GB). Make sure you have enough free space available, check this before continueing. I went for double the recommended amount as I want to avoid to repartition later. Accept the other defaults and Ubuntu will start. Keep waiting as Easy Install is installing Ubuntu on your behalf.

If you are a chmod 777 user (jackpot settings), this is a great time to read up on file system permissions by reading the article series starting with “Linux File Permission Concepts” (click next in the summary, there are 5 articles in total): 
http://articles.slicehost.com/2010/7/17/linux-file-permission-concepts

After a restart the login screen appear and after a successful login you will see the desktop. Because we are going to install a bunch of software let’s make sure everything we already have is up to date. Start the update manager > Settings > Ubuntu Software > Other > Select Best Server. This will speed up downloads. Check again and install updates.

Time to read some more, btw have you created a new tag for all these bookmarks yet?
When you are finished reading the above articles, here are some really good resources to read later:

http://articles.slicehost.com/sitemap
http://library.linode.com/
http://askubuntu.com/questions?sort=votes
You should now have a running Ubuntu system.

Post series: #vmdev-setup
