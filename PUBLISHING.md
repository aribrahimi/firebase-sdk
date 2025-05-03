# Publishing to npm

Follow these steps to publish the Firebase Auth SDK to npm:

## Prerequisites

1. Make sure you have an npm account. If not, create one at [npmjs.com](https://www.npmjs.com/signup).

2. Log in to npm via the command line:
   ```bash
   npm login
   ```
   Enter your username, password, and email when prompted.

## Publish Steps

### 1. Check if the name is available

The package name in package.json is currently `@kaayan/firebase-auth-sdk`. If you want to publish it under your own scope:

```bash
# Check if the package name is available
npm search @kaayan/firebase-auth-sdk
```

If you want to change the scope or name, edit the package.json file accordingly.

### 2. Build the package

Ensure the package is built before publishing:

```bash
npm run build
```

### 3. Verify the package contents

Check what files will be included in the published package:

```bash
npm pack
```

This will create a tarball file (e.g., `kaayan-firebase-auth-sdk-1.0.0.tgz`). You can inspect it to make sure it includes all the necessary files and excludes development files.

### 4. Publish the package

To publish the package to npm:

```bash
npm publish --access public
```

The `--access public` flag is required for scoped packages (starting with `@`) if this is your first package or if you have a free npm account.

### 5. Verify the publication

After publishing, you can verify that the package was published successfully:

```bash
npm view @kaayan/firebase-auth-sdk
```

## Updating the Package

To update the package in the future:

1. Make changes to the codebase.
2. Update the version number in package.json (follow semantic versioning).
3. Run `npm run build` to build the updated package.
4. Run `npm publish` to publish the updated version.

## Semantic Versioning

When updating the version number, follow these guidelines:

- **Patch version (1.0.x)**: Backward-compatible bug fixes
- **Minor version (1.x.0)**: New features that are backward-compatible
- **Major version (x.0.0)**: Changes that break backward compatibility

## Unpublishing a Package

If you need to unpublish a package within 72 hours of publishing:

```bash
npm unpublish @kaayan/firebase-auth-sdk@1.0.0
```

After 72 hours, you cannot unpublish a specific version, but you can deprecate it:

```bash
npm deprecate @kaayan/firebase-auth-sdk@1.0.0 "This version is deprecated for XYZ reasons"
``` 