---
layout: post
title: Rotate PHP logs
date: '2011-02-28T14:38:58+00:00'
tags: []
tumblr_url: http://vandragt.com/post/22188880939/rotate-php-logs
---
Our php.log was nearing 550MB so I was investigating how to rotate the logs. The easiest solution seems to be using logrotate (ubuntu linux) with a script like folows. sudo nano /etc/logrotate.d/php5

[code language=”shell”]

/var/log/php5/*.log {

#rotate daily
daily

# keep 14 days
rotate 14

 missingok
 nocompress
 sharedscripts
 postrotate
 apache2ctl graceful
 endscript

}

[/code]

Make sure that log_errors = /var/log/php5/php_errors.log in php.ini and that the file exists and is chmod 777.

Thanks to the following article that helped me going: Logrotate | PHP vs .Net.
