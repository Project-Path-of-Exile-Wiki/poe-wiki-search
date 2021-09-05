#!/bin/bash

EXT_NAME="poe-wiki-search"

# This will run the commands which allow you to create both the chromium-based and FF extension packages.
mkdir -p package; cd build; zip -r -FS ../package/$EXT_NAME.zip *; cd ..;
