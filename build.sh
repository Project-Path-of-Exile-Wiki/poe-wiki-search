#!/bin/bash

EXT_NAME="poe-wiki-search"

# This will run the commands which allow you to create both the chromium-based and FF extension packages.
cd src/; zip -r -FS ../build/$EXT_NAME.zip *; cd ..;
