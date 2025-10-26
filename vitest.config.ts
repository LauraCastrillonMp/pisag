import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['__tests__/setup.ts'],
    include: [
      '__tests__/unit/**/*.test.{ts,tsx}',
      '__tests__/integration/**/*.test.{ts,tsx}',
      '__tests__/performance/**/*.test.{ts,tsx}',
    ],
    exclude: [
      'node_modules',
      '.next',
      'coverage',
      '__tests__/acceptance/**',
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: [
        'node_modules/',
        '__tests__/',
        '.next/',
        '*.config.*',
        'coverage/',
        'components/ui/**',
        'types/**',
      ],
      thresholds: {
        lines: 60,
        functions: 60,
        branches: 60,
        statements: 60,
      },
    },
    testTimeout: 10000,
    hookTimeout: 10000,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
});