---
permalink: /projects/
layout: default
title: Projects
---

<div id="body">   
	<h2>{{ page.title }} <a style="text-decoration:none" class="permalink" href="{{ page.url }}">∞</a></h2>

	<div class="text item">

{% for cat in site.category-list %}
<h3 class="pcase">{{ cat }}</h3>
<ul>
		{% for page in site.pages %}
			{% if page.project == true %}
				{% for pc in page.categories %}
					{% if pc == cat %}
<li><a href="{{ page.url }}">{{ page.title }}</a></li>
					{% endif %}
				{% endfor %} 
			{% endif %}
		{% endfor %}
</ul>
{% endfor %}
		

	</div> <!-- end single post -->

</div>
