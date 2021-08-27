#!/bin/bash

EXT_NAME="poe-wiki-search"

# This will run the commands which allow you to create both the chromium-based and FF extension packages.
# For Firefox this is simply:
cd src/; zip -r -FS ../build/$EXT_NAME.zip *; cd ..;

# Chromium stuff is a bit more finicky..
# TODO: add chrome packing..