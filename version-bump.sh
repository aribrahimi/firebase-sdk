#!/bin/bash

# Script to help bump package version

# Check if a version type is provided
if [ -z "$1" ]; then
  echo "Usage: ./version-bump.sh <patch|minor|major>"
  echo "Example: ./version-bump.sh patch"
  exit 1
fi

VERSION_TYPE=$1

if [ "$VERSION_TYPE" != "patch" ] && [ "$VERSION_TYPE" != "minor" ] && [ "$VERSION_TYPE" != "major" ]; then
  echo "Invalid version type. Use patch, minor, or major."
  exit 1
fi

# Get current version
CURRENT_VERSION=$(node -e "console.log(require('./package.json').version)")
echo "Current version: $CURRENT_VERSION"

# Update version in package.json
echo "Bumping $VERSION_TYPE version..."
npm version $VERSION_TYPE

# Get new version
NEW_VERSION=$(node -e "console.log(require('./package.json').version)")
echo "New version: $NEW_VERSION"

# Show git tag
echo "Git tag v$NEW_VERSION created."

echo "Version bump completed!"
echo ""
echo "To push changes and tag to GitHub:"
echo "  git push && git push --tags"
echo ""
echo "To publish the new version to npm:"
echo "  ./npm-publish.sh" 