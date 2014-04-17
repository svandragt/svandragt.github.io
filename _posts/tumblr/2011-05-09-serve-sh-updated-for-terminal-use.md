---
layout: post
title: Serve.sh updated for terminal use
date: '2011-05-09T10:19:35+00:00'
tags: []
tumblr_url: http://vandragt.com/post/22188891076/serve-sh-updated-for-terminal-use
---
After publishing the previous article about serve.sh - the shell script I created to easily serve websites in development - I made some changes to make it easier to run it from the terminal, for example over ssh. I thought I’d share it with you.

One of the problems with the original script was that it was optimized for a GUI setting - ie. start the script by clicking on it from the desktop. However usually I want to run it from the terminal. I don’t like typing so I added code to make the script available from any directory to the ~/.bashrc:

[shell]
export PATH=$PATH:~/bin
[/shell]

Then moved it to that path and renamed it to shave another 3 characters off the syntax:

[shell]
mv ~/Desktop/serve.sh ~/bin/serve
[/shell]

In addition I noticed that prompting which site should be served was just a workaround for commandline arguments, which are now added. It doesn’t check that you entered an argument though. So the new script now requires you to specify which directory you want to serve: to serve the current directory simply run:

[shell]
serve .
[/shell]

Latest script contents:

[shell]
#!/bin/bash
my_path=`readlink -f $1`
sudo rm /var/www
sudo ln -s $my_path /var/www
echo Now serving $my_path…
[/shell]
