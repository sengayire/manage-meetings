module.exports = {
  extends: 'airbnb',
  plugins: ['react', 'import'],
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true
  },
  rules: {
    'react/prefer-stateless-function': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/no-children-prop': 0,
    'react/require-default-props': 0
  }
};
