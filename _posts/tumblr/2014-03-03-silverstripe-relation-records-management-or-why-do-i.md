---
layout: post
title: SilverStripe relation records management - or why do I have so many database
  records?
date: '2014-03-03T13:32:47+00:00'
tags:
- silverstripe
- database
tumblr_url: http://vandragt.com/post/78436798756/silverstripe-relation-records-management-or-why-do-i
---
You have a bunch of `DataObjects` that `has_many RelatedItems`. You might have the following seperate situations:

1. Get the `Dataobject->RelatedItems()` and `remove()` one `RelatedItem`. What happens to that `RelatedItem`?
2. `Delete()` a `DataObject`. What happens to the `RelatedItems` for that `DataObject`?

Regarding 1: (in SilverStripe 3.0.x) - the `DataObjectID` for that `RelatedItem` is set to 0.

Regarding 2: Nothing, their `DataObjectID` will point to a non-existing record.

### Wrong Expectations

In both cases I expected the objects to be deleted, but SilverStripe is going for safety first and keeps the records around just in case.

This means that you might need to write maintenance code if you don’t expect this happening.

### Things to keep in mind

If you are writing an sync task and want to make sure RelatedItems are fresh, do not delete / remove RelatedItems before creating new ones. You will be creating thousands of records over time.

Instead, get the list of IDs, and unset the IDs that you find. Then remove any IDs left in the list as they weren’t in the source.
