# NPM Publishing Guide

This guide explains how to publish the Firebase Auth SDK to npm.

## Prerequisites

1. Make sure you have an npm account. If not, create one at [npmjs.com](https://www.npmjs.com/signup).
2. Install npm (comes with Node.js): [nodejs.org](https://nodejs.org/)

## Setup

### Login to npm

Before publishing, you need to log in to your npm account:

```bash
npm login
```

You'll be prompted to enter your username, password, and email.

## Publishing Process

### Option 1: Using the Automated Script

We've included a script to simplify the publishing process:

```bash
npm run publish:npm
```

This script will:
1. Check if you're logged in to npm
2. Build the package
3. Run tests
4. Show what will be published
5. Publish the package with public access

### Option 2: Manual Publishing

If you prefer to do it manually:

1. Build the package:
   ```bash
   npm run build
   ```

2. Run tests to ensure everything works:
   ```bash
   npm test
   ```

3. Publish the package:
   ```bash
   npm publish --access public
   ```

## Versioning

### Automated Version Bumping

We've included scripts to help manage versions following semantic versioning:

```bash
# For bug fixes and minor changes (0.0.X)
npm run release:patch

# For new features (0.X.0)
npm run release:minor

# For breaking changes (X.0.0)
npm run release:major
```

### Manual Version Bumping

To manually update the version:

1. Edit the version in package.json
2. Commit the change:
   ```bash
   git add package.json
   git commit -m "Bump version to X.X.X"
   git tag vX.X.X
   ```

## After Publishing

1. Verify the package is on npm:
   ```bash
   npm view @kaayan/firebase-auth-sdk
   ```

2. Update documentation if needed.

3. Push changes to GitHub:
   ```bash
   git push && git push --tags
   ```

## Troubleshooting

### Common Issues

1. **"You need to be logged in to publish packages"**: Run `npm login` first.

2. **"Package name already exists"**: Check if the package name is already taken or if you need to update the version.

3. **"Scope not found"**: Ensure you have access to the scope (e.g., `@kaayan`).

4. **"No auth token found"**: Run `npm logout` and then `npm login` again.

5. **"Forbidden"**: Ensure your npm account has the necessary permissions.

## Unpublishing

If you need to unpublish a version (within 72 hours of publishing):

```bash
npm unpublish @kaayan/firebase-auth-sdk@1.0.0
```

For versions older than 72 hours, you can deprecate them:

```bash
npm deprecate @kaayan/firebase-auth-sdk@1.0.0 "This version is deprecated"
``` 