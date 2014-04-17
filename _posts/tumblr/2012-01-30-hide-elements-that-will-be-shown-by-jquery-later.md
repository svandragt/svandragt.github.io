---
layout: post
title: Hide elements that will be shown by jQuery later
date: '2012-01-30T10:51:37+00:00'
tags: []
tumblr_url: http://vandragt.com/post/22189014962/hide-elements-that-will-be-shown-by-jquery-later
---
I stumbled upon this gem by Jerph on Stackoverflow:

Right after the body tag, put a script tag with this javascript:

jQuery(''body'').addClass(''js'');
This gives you a style hook for any elements that will look different in some way when Javascript enabled, and it happens immediately.

via css - Hide jQuery Accordion while loading - Stack Overflow.
