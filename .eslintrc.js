module.exports = {
  root: true,
  env: {
    browser: true,
    commonjs: true,
    es2020: true,
    webextensions: true,
  },
  ignorePatterns: ['/tools', '/node_modules', '/extension-dist'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
  },
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'airbnb-base',
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended'
  ],
  rules: {
    'import/extensions': 'off'
  },
};
