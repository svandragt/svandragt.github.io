---
layout: post
title: When Get-ADUser does not return the complete user
date: '2012-11-13T00:00:00+00:00'
tags:
- activedirectory
- powershell
tumblr_url: http://vandragt.com/post/57517005476/when-get-aduser-does-not-return-the-complete-user
---
When writing a Powershell script that checks for changes to Active Directory users, you may find that all users change every time you run the script. One explanation for seeing this behaviour is because Get-ADUser does not return all the fields. A field that is not returned can never be equal to a string value.

For example, let’s consider the following code:

$csv_file  = "users.csv"
Import-Csv $csv_file | ForEach-Object {
    $username = $_.USERNAME
    $ad_user = (Get-ADUser -filter {sAMAccountName -eq $username})
    if (!$ad_user) {
        # create account, it does not exist
    }
    else {
        $filter_accountchanged = { $ad_user.DisplayName -cne $displayname }
        if ($ad_user | Where $filter_accountchanged) {
            # update existing accounts with changes
        }
        else {
            # account exists and has not changed
        }
    }
}


You will find that all existing accounts come up as having changed. This is because $user.DisplayName is not returned by Get-ADUser.

The issue is resolved by asking Get-ADUser to return all properties:

$ad_user = (Get-ADUser -filter {sAMAccountName -eq $username} -Properties * )


Now all properties are returned, and the “account change” filter works as expected.
