---
layout: post
title: Using mysqldump to generate database backups
date: '2011-07-06T13:05:04+00:00'
tags: []
tumblr_url: http://vandragt.com/post/22188892965/using-mysqldump-to-generate-database-backups
---
When administrating a database server, you will definitely have to put a backup solution into place. I normally run mysqldump on the database and save it to a file. However when the database server has several dozens or more databases, setting up a process for each instance quickly becomes unwieldy.

Instead, I wrote a batch file to automatically create SQL backups by quering all databases. Simply set up a scheduled task to run it at the desired interval.

Contents of dumper.bat:

[sourcecode language=”plain”]
@echo off
mkdir dumps
mysql -N < list_dbs.sql > dbs_list.txt
for /F “tokens=*” %%A in (dbs_list.txt) do ping localhost -n 2 > nul & echo dumping %%A & mysqldump —add-drop-database —database %%A > dumps\%%A.sql
[/sourcecode]

Contents of list_dbs.sql:

[sourcecode language=”sql”]
SHOW DATABASES;
[/sourcecode]

I have noticed that the database server becomes quite highly utilized even with the the pause between dumping each database, so as with all solutions please test it in your environment first before implementing if this is an issue for you.
