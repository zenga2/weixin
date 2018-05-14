#!/usr/bin/env bash

kill `pidof node`
nohup node src/main.js &
sleep 1

