// eslint.config.js
import globals from 'globals';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    ignores: ['**/node_modules/**', '**/.next/**', '**/dist/**', '**/build/**'],
  },
  {
    files: ['**/*.{js,jsx,mjs,cjs}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: { ...globals.browser, ...globals.node },
    },
    rules: {
      // ✅ turn off strict unused-imports checks for now
      'unused-imports/no-unused-imports': 'off',
      // ✅ allow unused vars, but warn unless prefixed with "_"
      'no-unused-vars': [
        'warn',
        { vars: 'all', args: 'after-used', varsIgnorePattern: '^_', argsIgnorePattern: '^_' },
      ],
    },
  },
]);
