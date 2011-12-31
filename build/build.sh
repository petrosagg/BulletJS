#!/bin/bash

files='';
srcfolder='../src/';
option=' --js '$srcfolder;

for file in `cat files.list`; do
    files=$files$option$file;
done;

java -jar compiler.jar --generate_exports --jscomp_off nonStandardJsDocs --jscomp_off internetExplorerChecks --language_in ECMASCRIPT5_STRICT --compilation_level ADVANCED_OPTIMIZATIONS --warning_level VERBOSE $files --js_output_file bullet.js
