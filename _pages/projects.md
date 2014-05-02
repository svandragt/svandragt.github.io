---
permalink: /projects/
layout: default
title: Projects
---

<div id="body">   
	<h2>{{ page.title }} <a style="text-decoration:none" class="permalink" href="{{ page.url }}">∞</a></h2>

	<div class="text item projects">

		{% for site_category in site.category-list %}
		<h3>{{ site_category }}</h3>

		<ul class="category {{ site_category }}">
				{% assign pages = site.pages | sort: 'name' %}
				{% for page in pages %}
					{% if page.project == true %}
						{% for page_category in page.categories %}
							{% if page_category == site_category %}
		<li><a href="{{ page.url }}" {% if page.styles %}style="{{ page.styles}}"{% endif %}>{{ page.title }}</a></li>
							{% endif %}
						{% endfor %} 
					{% endif %}
				{% endfor %}
		</ul>
		{% endfor %}
				

	</div> <!-- end single post -->

</div>
