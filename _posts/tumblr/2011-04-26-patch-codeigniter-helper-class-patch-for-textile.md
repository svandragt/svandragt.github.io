---
layout: post
title: ! '[Patch] CodeIgniter Helper class patch for Textile'
date: '2011-04-26T14:57:51+00:00'
tags: []
tumblr_url: http://vandragt.com/post/22188889796/patch-codeigniter-helper-class-patch-for-textile
---
For those that do not follow me on twitter (@pacifika), I’ve created a patched version of Textile, the html generator alternative to Markdown, to make it easier to use in CodeIgniter projects. I have provided the patch and patched Textile on support forums of both projects.

[Patch] CodeIgniter Helper class patch for classTextile.php · Textpattern CMS Support Forum.

After patching, you can just use Textile like this:
$this->load->helper(''textile'');
$text = Textile("Dude this is *my* code!");
For more information read the post on the forums!
