---
permalink: /blog/
layout: default
title: Blog Archive
---

<div id="body">   
	<h2>{{ page.title }} <a style="text-decoration:none" class="permalink" href="{{ page.url }}">∞</a></h2>
	<div class="archive item">
		  <dl class="posts">
			{% for post in site.posts %}
			  <dt>{{ post.date | date_to_string }}</dt>
			  <dd>
				<p><a href="{{ post.url }}">{{ post.title }}</a></p>
				<p><em>{{ post.excerpt }}</em></p>
			  </dd>
			{% endfor %}
		  </dl>
	</div>
</div>
