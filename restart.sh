#!/usr/bin/env bash

kill `pidof node`
git fetch origin master
git merge origin master
nohup node src/main.js &
sleep 10
