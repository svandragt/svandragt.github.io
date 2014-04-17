---
layout: post
title: Improving someone's code
date: '2008-01-23T14:46:41+00:00'
tags: []
tumblr_url: http://vandragt.com/post/22188860772/improving-someones-code
---
Don’t call your submit button ‘submit’ if you want to change the submit event with Javascript:     If you do, the browser (please read “Firefox 1.5 or IE 6″ - that’s what I tested at the moment) will consider submit is an object. And an object is not a function (although you might enjoy later on the paradox that a function is an object).   Source [webprodevelopment.com]
