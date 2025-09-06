import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname
})

const eslintConfig = [
  ...compat.config({
    extends: ['plugin:import/errors', 'plugin:import/warnings', 'plugin:import/typescript'],
    plugins: ['prettier', 'import'],
    ignorePatterns: ['node_modules', 'dist', 'build', '.next', 'out', 'coverage'],
    settings: {
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx']
      },
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: 'tsconfig.json'
        }
      }
    },

    rules: {
      'prettier/prettier': [
        'warn',
        {
          arrowParens: 'always',
          semi: false,
          trailingComma: 'none',
          tabWidth: 2,
          endOfLine: 'auto',
          useTabs: false,
          singleQuote: true,
          printWidth: 120,
          jsxSingleQuote: true
        }
      ],
      'import/order': [
        'warn',
        {
          groups: [['builtin', 'external'], 'internal', ['sibling', 'parent'], 'index'],
          'newlines-between': 'always'
        }
      ],
      'import/no-unresolved': 'error'
    }
  })
]

export default eslintConfig
