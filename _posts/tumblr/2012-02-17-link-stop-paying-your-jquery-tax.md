---
layout: post
title: ! 'Link: Stop paying your jQuery tax'
date: '2012-02-17T11:07:07+00:00'
tags: []
tumblr_url: http://vandragt.com/post/22189016225/link-stop-paying-your-jquery-tax
---
Speed up your jQuery powered site by moving scripts to the footer.
Turns out that pushing jQuery to the footer is quite easy for the common case. If all we want is a nice $.ready function that we have accessible everywhere we can explicitly define it without jQuery. Then we can pass the functions we capture to jQuery later on after it loads.

The big lesson learned is that we could avoided this whole problem if we started off with my proposed helper.
via Stop paying your jQuery tax.
