const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@/assets': path.resolve(__dirname, 'src/assets'),
      '@/components': path.resolve(__dirname, 'src/components'),
      '@/constants': path.resolve(__dirname, 'src/constants'),
      '@/containers': path.resolve(__dirname, 'src/containers'),
      '@/hooks': path.resolve(__dirname, 'src/hooks'),
      '@/states': path.resolve(__dirname, 'src/states'),
      '@/types': path.resolve(__dirname, 'src/types'),
      '@/utils': path.resolve(__dirname, 'src/utils'),
      '@/services': path.resolve(__dirname, 'src/services')
    }
  },
  jest: {
    babel: {
      addPresets: true /* (default value) */,
      addPlugins: true /* (default value) */
    },
    configure: (jestConfig) => {
      /* ... */
      return {
        ...jestConfig,
        moduleNameMapper: {
          '@/assets/(.*)': '<rootDir>/src/assets/$1',
          '@/states/(.*)': '<rootDir>/src/states/$1',
          '@/containers/(.*)': '<rootDir>/src/containers/$1',
          '@/types/(.*)': '<rootDir>/src/types/$1',
          '@/utils/(.*)': '<rootDir>/src/utils/$1',
          '@/components/(.*)': '<rootDir>/src/components/$1',
          '@/customHook/(.*)': '<rootDir>/src/customHook/$1',
          '@/hooks/(.*)': '<rootDir>/src/hooks/$1',
          '@/services/(.*)': '<rootDir>/src/services/$1',
          '@/constants/(.*)': '<rootDir>/src/constants/$1'
        }
      };
    }
  }
};
