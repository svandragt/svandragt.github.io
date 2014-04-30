---
permalink: /archive/
layout: default
title: Archive
---

<div id="body">   
	<h2>{{ page.title }} <a style="text-decoration:none" class="permalink" href="{{ page.url }}">∞</a></h2>
	<div class="text item">
		  <ul class="posts">
			{% for post in site.posts %}
			  <li><span>{{ post.date | date_to_string }}</span> &raquo; <a href="{{ post.url }}">{{ post.title }}</a></li>
			{% endfor %}
		  </ul>
	</div>
</div>
