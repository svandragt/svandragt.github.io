---
layout: post
title: Why MySQL does not start
date: '2011-07-30T06:16:15+00:00'
tags: []
tumblr_url: http://vandragt.com/post/22189002101/why-mysql-does-not-start
---
The other day I was provided with a new Ubuntu server with a large data drive. It seemed a good idea to move (among other things) the mysql data folder onto this drive.

[code language=”bash”]

sudo mv /var/lib /var/media/lib
sudo ln -s /var/media/lib /var

[/code]

However when trying to start MySQL it will no longer start:

[code language=”bash”]

service mysql start
start: Unable to connect to system bus: Failed to connect to socket /var/run/dbus/system_bus_socket: No such file or directory

[/code]

The whole reason I did use a symbolic link was to avoid issues like this. What to do? It turns out AppArmor does not allow mysql to read out of the new /var/media/lib location, as noted in the my.conf file:

[code language=”bash”]

# * IMPORTANT
# If you make changes to these settings and your system uses apparmor, you may
# also need to also adjust /etc/apparmor.d/usr.sbin.mysqld.

[/code]

Simply open the mentioned file, duplicate the /var/lib/mysql lines and correct the path to the new locations. Restart AppArmor (or reboot) and Mysql can be started. Verify this by running:

[code language=”bash”]
ps -ef | grep mysql
[/code]
