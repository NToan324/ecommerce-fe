import js from '@eslint/js'
import pluginReact from 'eslint-plugin-react'
import pluginUnusedImports from 'eslint-plugin-unused-imports'
import { defineConfig } from 'eslint/config'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default defineConfig([
  {
    ignores: ['**/*.ts', '**/src/http/*.ts', '.next/', 'node_modules/', 'next-env.d.ts'],
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    plugins: { js, 'typescript-eslint': tseslint, 'unused-imports': pluginUnusedImports },
    extends: ['js/recommended'],
    languageOptions: { globals: globals.browser },
  },
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    settings: { react: { version: 'detect' } },
  },
  {
    rules: {
      'react/react-in-jsx-scope': 'off',
      'no-restricted-imports': [
        'error',
        {
          patterns: ['.*'],
        },
      ],
      'no-useless-escape': 'off',
      'react/prop-types': 'off',
      'react/no-unescaped-entities': 'off',
      'no-irregular-whitespace': 'off',
    },
  },
])
