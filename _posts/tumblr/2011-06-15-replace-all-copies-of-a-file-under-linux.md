---
layout: post
title: Replace all copies of a file under Linux
date: '2011-06-15T12:23:22+00:00'
tags: []
tumblr_url: http://vandragt.com/post/22188894899/replace-all-copies-of-a-file-under-linux
---
Today, after making a change to a php file, I had to update all copies of this file with the changes. The following command will update all files with the same name. Note that this will only work as expected if the name is unique. A theoretically better way to do it would be to find all files with a certain hash.

Anyways, here’s the linux shell command. First copy the updated file into the current directory (/tmp for example):
[shell]
find /target_path/ -iname “some_file.php” -exec cp new_file.php ‘{}’ \;
[/shell]
