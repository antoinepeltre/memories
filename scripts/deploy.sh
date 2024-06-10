#!/bin/bash

# Check out to master branch
git checkout master

# Add changes and commit with incremented version number
VERSION_FILE="version.txt"
if [ ! -f $VERSION_FILE ]; then
  echo "1" > $VERSION_FILE
fi
VERSION=$(cat $VERSION_FILE)
NEW_VERSION=$((VERSION + 1))
echo $NEW_VERSION > $VERSION_FILE

git add .
git commit -am "[DEPLOY] version $NEW_VERSION"

# Push changes to master
git push origin master

# Check out to production branch
git checkout production

# Merge changes from master to production
git pull origin master

# Push changes to production
git push origin production

# Switch back to master branch
git checkout master
