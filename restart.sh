#!/usr/bin/env bash
echo '------------- Ready to start ---------------------'
kill `pidof node`
nohup node src/main.js &
sleep 1
echo '------------- started successfully --------------------'

