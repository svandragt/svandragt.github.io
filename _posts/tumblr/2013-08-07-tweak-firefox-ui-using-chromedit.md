---
layout: post
title: Tweak Firefox UI using ChromEdit
date: '2013-08-07T11:02:56+00:00'
tags:
- firefox
tumblr_url: http://vandragt.com/post/57601810845/tweak-firefox-ui-using-chromedit
---
For a long time I have been wanting to switch to Firefox as my main browser. I haven’t done so before today because I didn’t like two things: The font-size of the address bar, and having a seperate search box.

Today I’ll show you how to fix these issues.

Fix Address bar font-size: [Install the ChromEdit Plus addon](http://webdesigns.ms11.net/chromeditp.html). Then, under *Tools > ChromEdit Plus > ChromEdit* add the following code to the `userChome.css`:

```
#urlbar { font-size: 16px; }
```

Press the Save and Restart buttons.  Afterwards you can disable this addon.

Remove the search box: right click on a *toolbar > Customise*. Drag the searchbox into the *Customise Toolbar* dialog to remove it from the UI.
