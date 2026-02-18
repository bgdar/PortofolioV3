#!/bin/bash 

# Author: bgdar
git checkout production
git add dist 
git commit -m "update production"
git push origin production


