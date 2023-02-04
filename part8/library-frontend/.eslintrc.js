module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'react-app',
    'prettier',
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', 'jest', '@typescript-eslint'],
  rules: {
    'no-console': 'off',
    'no-underscore-dangle': 'off',
  },
};
