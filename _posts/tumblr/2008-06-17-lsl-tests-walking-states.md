---
layout: post
title: ! 'LSL tests: walking states'
date: '2008-06-17T15:45:00+00:00'
tags: []
tumblr_url: http://vandragt.com/post/22188866553/lsl-tests-walking-states
---
I had to create a simple script to turn a neon sign on and off. I decided to have both versions of the sign in a single texture and changing the offset with a script. Instead of using a timer and using llSetTimeout() instead I opted to pause the script for a small amount of time. The script does not respond when it’s sleeping which should be less laggy then the timeout. All i do then at the start of a state is offsetting the texture to show the on/off alternatively.     default       {            state_entry()            {                llOffsetTexture(0.0,0.25,ALL_SIDES);                llSleep(1.37);                state off;            }        }     state off       {            state_entry()            {                llOffsetTexture(0.0,0.75,ALL_SIDES);                llSleep(.723);                state default;            }        }   Hope this is of use to you. See the result in our Higher / Lower game at Badmoon.
