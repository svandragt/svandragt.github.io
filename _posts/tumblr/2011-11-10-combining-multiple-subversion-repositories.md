---
layout: post
title: Combining multiple Subversion repositories
date: '2011-11-10T15:30:52+00:00'
tags: []
tumblr_url: http://vandragt.com/post/22189011661/combining-multiple-subversion-repositories
---
This post describes a step by step guide on how to combine multiple Subversion repositories whilst keeping individual history (and commit messages).

Dumping

Exporting from pagefeedbacktool repository the /trunk/public folder and integrating that into the services repository under /trunk/public/pagefeedback:

Dump the repository including only /trunk/public as follows:

E:\Repositories\pagefeedbacktool>svnadmin dump .| svndumpfilter include --drop-empty-revs --renumber-revs trunk/public > ..\services\filtered.dump


Loading

However as pathnames are stored as part of the dump (and replacing the path with a texteditor corrupts the dump), we have to include the full path under a different parent directory:

In VisualSVN create a /trunk/public/pagefeedback/trunk/public folder structure (try without the final public if import fails) then load the dump as follows:

E:\Repositories\services>svnadmin load . --parent-dir "trunk/public/pagefeedback" < filtered.dump


The dump is successful but at the wrong path:

currently: /trunk/public/pagefeedback/trunk/public 
should be: /trunk/public/pagefeedback/

Post-correction

Open two Windows Explorer windows with both paths side by side, select all the files that should be moved, then RIGHT click drag them to the destination folder and choose SVN Move versioned files here...

Commit from the repository root.

It is now safe to remove the trunk/public folders under /trunk/public/pagefeedback/

Commit again.
