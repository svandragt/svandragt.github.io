---
layout: post
title: Preprocessing CCK field output
date: '2011-12-07T14:10:58+00:00'
tags: []
tumblr_url: http://vandragt.com/post/22189014207/preprocessing-cck-field-output
---
So I spent a totally unproductive morning figuring out how to override a single field’s output in Drupal without rewriting my complete template code for the content type - I want to keep using the $content variable. After many a fruitless attempt luckily Grag Harvey has the answer:
Actually, control over CCK fields can be gained using CCK’s own templates.

Consider the situation where your field is called field_test.

Copy content-field.tpl.php to your theme directory and copy it again for the field whose mark-up you wish to alter, naming it content-field-field_test.tpl.php in this case.

Then change the mark-up in the file and it will alter the output of that specific CCK field.

No need to touch node.tpl.php!
Adapted via greg.harvey’s answer at node.tpl.php | Drupal API.
