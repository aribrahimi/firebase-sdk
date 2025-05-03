#!/bin/bash

# Script to help publish the package to npm

# Ensure we're logged in to npm
echo "Checking npm login status..."
NPM_USER=$(npm whoami 2>/dev/null)
if [ $? -ne 0 ]; then
  echo "You are not logged in to npm. Please login first:"
  echo "npm login"
  exit 1
else
  echo "Logged in as: $NPM_USER"
fi

# Check if we're publishing a scoped package
PACKAGE_NAME=$(node -e "console.log(require('./package.json').name)")
if [[ $PACKAGE_NAME == @* ]]; then
  echo "Publishing scoped package: $PACKAGE_NAME"
  PUBLISH_CMD="npm publish --access public"
else
  echo "Publishing package: $PACKAGE_NAME"
  PUBLISH_CMD="npm publish"
fi

# Build the package first
echo "Building package..."
npm run build
if [ $? -ne 0 ]; then
  echo "Build failed!"
  exit 1
fi

# Run tests
echo "Running tests..."
npm test
if [ $? -ne 0 ]; then
  echo "Tests failed!"
  read -p "Do you want to continue with publishing despite test failures? (y/N) " CONT
  if [ "$CONT" != "y" ] && [ "$CONT" != "Y" ]; then
    echo "Publishing aborted."
    exit 1
  fi
fi

# Check what will be published
echo "Checking what will be published..."
npm pack --dry-run

# Confirm with user
echo ""
read -p "Ready to publish. Continue? (y/N) " CONT
if [ "$CONT" != "y" ] && [ "$CONT" != "Y" ]; then
  echo "Publishing aborted."
  exit 1
fi

# Publish
echo "Publishing to npm..."
$PUBLISH_CMD

# Check if publish was successful
if [ $? -eq 0 ]; then
  echo "Package successfully published to npm!"
  echo "View it at: https://www.npmjs.com/package/$PACKAGE_NAME"
else
  echo "Failed to publish package. Check the error messages above."
  exit 1
fi 