---
layout: post
title: Subversion repository creation rule
date: '2010-10-21T11:16:24+00:00'
tags: []
tumblr_url: http://vandragt.com/post/22188879708/subversion-repository-creation-rule
---
Do not use capitals      for repository names!
Because when checking out a working copy you will have to specify the      respository url case sensitive. Failing to provide the correct case      sensitive name result in things might appear to work but you might get      access forbidden messages for certain users in some point, and other      mysterious errors, such as the svn commit error below:
access to ‘/svn/project/!svn/act/c50e0f11-eec3-154a-9695-20ec222ad7f3’ forbidden
