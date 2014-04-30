---
permalink: /contact/
layout: default
title: Contact me
---
<h1>{{ site.name }}</h1>
<div id="body">
	<h2>{{ page.title }} <a style="text-decoration:none" class="permalink" href="{{ page.url }}">∞</a></h2>

	<div class="text item">

		<p>Just send me a message and I will reply shortly. Alternative <a href="http://twitter.com/svandragt">contact @svandragt on Twitter</a>.

		<form action="http://getsimpleform.com/messages?form_api_token=5008ebf7571e56e6873d99e5fc4ea7ad" method="post">
			<!-- the redirect_to is optional, the form will redirect to the referrer on submission -->
			<input type='hidden' name='redirect_to' value='http://vandragt.com/contact/thanks'>
			<!-- all your input fields here.... -->
			<label for="name">Email</label>
			<input type='email' name='email' id="email">

			<label for="message">Message</label>
			<textarea name='message' id="message"></textarea>
		
			<label for"send">Send</label>
			<input type='submit' value='Send message' name="send" id="send">
		</form>

	</div>
</div>
