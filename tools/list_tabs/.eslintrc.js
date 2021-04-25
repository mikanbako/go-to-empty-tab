module.exports = {
  root: true,
  env: {
    browser: true,
    commonjs: true,
    es2020: true,
    webextensions: true,
  },
  extends: [
    'airbnb-base',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
  },
};
