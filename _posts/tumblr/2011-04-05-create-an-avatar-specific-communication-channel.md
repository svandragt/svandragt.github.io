---
layout: post
title: Create an Avatar Specific Communication Channel
date: '2011-04-05T10:47:27+00:00'
tags: []
tumblr_url: http://vandragt.com/post/22188885544/create-an-avatar-specific-communication-channel
---
Sometimes you will want to create a listener that will not interfere with any other avatar using the same object near you. The basic solution of detecting the owner creates a lot of overhead, therefore a better solution is to have individual channels.

Thanks to Winter Seale, on the SecondLife scripters mailing list:
use an avatar specific
channel.  To do that I would define a function:

[code]
integer get_channel(key avatar, integer offset){
return (integer)(“0x”+llGetSubString((string)llGetOwnerKey(),-8,-1))
+ offset
}
[/code]

Then in your script, use:

[code]
llSay( get_channel( llDetectedKey(number), -1234 ), (string)llDetectedKey(number) );
…
llListen( get_channel( llGetOwner(), -1234 ), “”, “”, “”);[/code]

* The reason this is better is that it keeps only one script (the
avatar’s) listening on this channel.  Without this, a script for every
person with a HUD would have to execute code every time your in world
object was touched.
