import { validateConfig, DEFAULT_CONFIG } from '../config';
import { FirebaseConfig } from '../../types';

describe('Config Module', () => {
  describe('validateConfig', () => {
    it('should throw error for missing required fields', () => {
      const invalidConfig: FirebaseConfig = {
        apiKey: '',
        authDomain: '',
        projectId: '',
        appId: '',
      };

      expect(() => validateConfig(invalidConfig)).toThrow('Missing required Firebase config field');
    });

    it('should apply default enabled providers when not provided', () => {
      const config: FirebaseConfig = {
        apiKey: 'test-api-key',
        authDomain: 'test-domain',
        projectId: 'test-project',
        appId: 'test-app-id',
      };

      validateConfig(config);
      
      expect(config.enabledProviders).toBeDefined();
      expect(config.enabledProviders?.google).toBe(false);
      expect(config.enabledProviders?.facebook).toBe(false);
      expect(config.enabledProviders?.apple).toBe(false);
      expect(config.enabledProviders?.github).toBe(false);
    });

    it('should merge with default enabled providers when partially provided', () => {
      const config: FirebaseConfig = {
        apiKey: 'test-api-key',
        authDomain: 'test-domain',
        projectId: 'test-project',
        appId: 'test-app-id',
        enabledProviders: {
          google: true,
        },
      };

      validateConfig(config);
      
      expect(config.enabledProviders).toBeDefined();
      expect(config.enabledProviders?.google).toBe(true);
      expect(config.enabledProviders?.facebook).toBe(false);
      expect(config.enabledProviders?.apple).toBe(false);
      expect(config.enabledProviders?.github).toBe(false);
    });
  });

  describe('DEFAULT_CONFIG', () => {
    it('should have empty string values for required fields', () => {
      expect(DEFAULT_CONFIG.apiKey).toBe('');
      expect(DEFAULT_CONFIG.authDomain).toBe('');
      expect(DEFAULT_CONFIG.projectId).toBe('');
      expect(DEFAULT_CONFIG.appId).toBe('');
    });

    it('should have default enabled providers', () => {
      expect(DEFAULT_CONFIG.enabledProviders).toBeDefined();
      expect(DEFAULT_CONFIG.enabledProviders?.google).toBe(false);
      expect(DEFAULT_CONFIG.enabledProviders?.facebook).toBe(false);
      expect(DEFAULT_CONFIG.enabledProviders?.apple).toBe(false);
      expect(DEFAULT_CONFIG.enabledProviders?.github).toBe(false);
    });
  });
}); 