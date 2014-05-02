---
title: Bard
permalink: /projects/bard/
layout: default
categories: [software]
project: true
images: [ 
'http://getbard.com/assets/bard_presets_full.png',	
'http://getbard.com/assets/bard_contextmenu_full.png',	
'http://getbard.com/assets/bard_dcupdater_full.png'
]
---

<div id="body">   
	<h2>{{ page.title }} <a style="text-decoration:none" class="permalink" href="{{ page.url }}">∞</a></h2>
	<div class="project item">

		<h3>Summary</h3>
		<p>BARD is the only affordable tool to organise your sample library with minimal hassle and maximum efficiency. Aimed at music producers and other audio enthusiasts, it has a unique feature-set to whip those thousands of audio files you have lying around back into shape.</p>
		
		<h3>Participation</h3>
		<p>Bard the program and the website were created, designed and developed by me.</p>
		
		<h3>Web Address</h3>
		<p><a href="http://getbard.com">getbard.com</a></p>

		<h3>Screenshots</h3>

		{% if page.images %}
		<ul class="gallery">
			{% for url in page.images %}
			<li><img src="{{ url }}"></li>
			{% endfor %}
		</ul>
		{% endif %}
		

	</div>
</div>
