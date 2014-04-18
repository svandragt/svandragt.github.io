#!/usr/bin/env bash
apt-get update
apt-get install ruby1.9.1-dev
gem update
gem install psych -- --enable-bundled-libyaml
gem install jekyll kramdown
