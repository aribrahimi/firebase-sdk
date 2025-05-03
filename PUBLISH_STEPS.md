# Publishing Steps

## 1. Login to npm

Run the following command and enter your npm credentials when prompted:

```bash
npm login
```

## 2. Publish the package

Once logged in, publish your package with:

```bash
npm publish --access public
```

The `--access public` flag is required for scoped packages like `@kaayan/firebase-auth-sdk` to make them publicly accessible.

## 3. Verify the publication

After publishing, check that your package is available on npm:

```bash
npm view @kaayan/firebase-auth-sdk
```

You can also visit your package page at:
https://www.npmjs.com/package/@kaayan/firebase-auth-sdk

## Troubleshooting

### Package name already exists

If the package name is already taken, you can:

1. Use a different scope name by updating package.json:
   ```json
   "name": "@your-scope/firebase-auth-sdk"
   ```

2. Use a different package name:
   ```json
   "name": "@kaayan/firebase-authentication"
   ```

### Authentication issues

If you encounter authentication issues:

1. Try logging out and back in:
   ```bash
   npm logout
   npm login
   ```

2. Make sure your npm account has the correct permissions for the scope.

3. For organization scopes, make sure you're a member with publishing rights.

### Version conflicts

If the version already exists:

1. Update the version in package.json:
   ```json
   "version": "1.0.1"
   ```

2. Run build again:
   ```bash
   npm run build
   ```

3. Try publishing again. 