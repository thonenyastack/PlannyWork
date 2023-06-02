#!/bin/bash
for file in components/*.js
do
    mv "$file" "${file%.js}.jsx";
done

# for one liner use below
# for file in assets/wrappers/*.js; do
# mv "$file" "${file%.js}.jsx"; done