firebase-auth-sdk/
├── src/
│   ├── index.ts               # Entry point for SDK
│   ├── config.ts              # SDK config schema + default config
│   ├── firebaseClient.ts      # Initializes Firebase app
│   ├── auth/
│   │   ├── signIn.ts          # Handles sign-in with provider
│   │   ├── signOut.ts         # Sign out logic
│   │   ├── getCurrentUser.ts  # Return current user
│   │   └── onAuthStateChanged.ts # Subscribe to auth changes
├── types/
│   └── index.d.ts             # Types for config and auth
├── package.json
├── tsconfig.json
└── README.md
