module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/prettier'],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-unused-vars': ['off'],
  },
  globals: {
    uni: true,
    wx: true,
    getApp: true,
    Component: true,
    requirePlugin: true,
  },
};
