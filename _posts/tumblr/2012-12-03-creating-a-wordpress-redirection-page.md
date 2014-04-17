---
layout: post
title: Creating a WordPress redirection page
date: '2012-12-03T00:00:00+00:00'
tags:
- wordpress
tumblr_url: http://vandragt.com/post/57516682363/creating-a-wordpress-redirection-page
---
This is the simplest way to add a page redirection feature to your WordPress theme.

First, create a new theme file called redirect.php with the following contents:

 <?php
 /*
 Template Name: Redirect
 */
 the_post();
 header(''Location: '' . get_the_content());
 die();


To create a new redirection page:

New page, change the template to ‘Redirect’
Switch to HTML editing mode and put the url in the content area.
