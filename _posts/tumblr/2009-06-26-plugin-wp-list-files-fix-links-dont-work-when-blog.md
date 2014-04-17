---
layout: post
title: ! '[Plugin: WP List Files] Fix: links don''t work when blog not installed in
  root of site'
date: '2009-06-26T09:24:00+00:00'
tags: []
tumblr_url: http://vandragt.com/post/22188875819/plugin-wp-list-files-fix-links-dont-work-when-blog
---
We’re using a customized version of WordPress as an electronic portfolio for students and we are using WP List Files to make documents available on the eportfolio. Unfortunately the WordPress support forums seem to delete my topic (possibly because it’s an older version) and the author is no longer supporting the plugin.
Due to time constraints, these plugins are no longer supported and will not be updated, ever! Unless you know what you’re doing, I strongly discourage using these on a production blog since they have not been tested since WordPress 2.5.
The plugin didn’t work in version 2.0.3 that we are using because the wp_enqueue_script function does not exist in this version  (the codex page does not say when this function was added). Anyway after manually adding the javascript to the theme’s head element the plugin almost worked fine - links didn’t take our folder structure into account.

works:
joeblogs.com</dir specified in post or page>

doesn’t work:
allblogs.com/blogs/joebloggs</dir specified in post of page>

Fix it by replacing line 231 to read:
$files .= ‘<li><a href=”’.get_bloginfo(‘wpurl’).$item[‘link’].’”>’.$itemName.’</a>’.
The hyperlink created for the item didn’t have the complete blog url in it it assumed the blog was installed in the root of the domain. After this fix the plugin works fine.
