import { FirebaseConfig, EnabledProviders } from '../types';

const DEFAULT_ENABLED_PROVIDERS: EnabledProviders = {
  google: false,
  facebook: false,
  apple: false,
  github: false
};

export const DEFAULT_CONFIG: FirebaseConfig = {
  apiKey: '',
  authDomain: '',
  projectId: '',
  appId: '',
  enabledProviders: DEFAULT_ENABLED_PROVIDERS
};

export function validateConfig(config: FirebaseConfig): void {
  const requiredFields = ['apiKey', 'authDomain', 'projectId', 'appId'];
  
  for (const field of requiredFields) {
    if (!config[field as keyof FirebaseConfig]) {
      throw new Error(`Missing required Firebase config field: ${field}`);
    }
  }
  
  // Merge with default enabled providers
  if (!config.enabledProviders) {
    config.enabledProviders = DEFAULT_ENABLED_PROVIDERS;
  } else {
    config.enabledProviders = {
      ...DEFAULT_ENABLED_PROVIDERS,
      ...config.enabledProviders
    };
  }
} 