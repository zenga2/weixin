#!/usr/bin/env bash

kill `pidof node`
git fetch origin master
git merge origin master
npm run start
