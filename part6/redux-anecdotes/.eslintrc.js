module.exports = {
    env: {
      browser: true,
      commonjs: true,
      es2021: true,
      jest: true,
    },
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'react-app',
      'airbnb-base',
    ],
    overrides: [
    ],
    parserOptions: {
      ecmaVersion: 'latest',
    },
    plugins: [
      'react',
      'jest'
    ],
    rules: {
      'no-console': 'off',
      'no-underscore-dangle': 'off',
      'default-param-last': 'off',
      'no-case-declarations': 'off',
      'no-param-reassign': 'off'
    },
  };
  