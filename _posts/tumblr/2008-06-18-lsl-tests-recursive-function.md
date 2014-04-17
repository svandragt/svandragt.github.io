---
layout: post
title: ! 'LSL tests: recursive function'
date: '2008-06-18T15:56:34+00:00'
tags: []
tumblr_url: http://vandragt.com/post/22188867203/lsl-tests-recursive-function
---
It’s good practice to make code easy to maintain, so sometimes you’ll want to use less code using recursive functions. In order to find out how to this works in Second Life I created this small recusive example:     integer i = 0;       integer top = 0;        integer Monkeys()        {            llOwnerSay(“monkeys”);            i++;            if (i <= top)                return Monkeys();            else                return i;        }        default        {            state_entry()            {                llSay(0, “Hello, Avatar!”);            }            touch_start(integer total_number)            {                i = 0;                top = Monkeys();                llOwnerSay((string)top);            }        }   This script says monkeys an increasing amount of times every time you touch it by calling itself if and keeping track of the total amount of times the function is called. First time there will be 1 monkey, next time 2 monkeys etc. Find more products at our shop in Badmoon.
