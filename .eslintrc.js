module.exports = {
  extends: [
    'airbnb',
    'airbnb/hooks',
    'eslint:recommended',
    'plugin:react/recommended',
    'prettier'
  ],

  plugins: ['react', 'react-hooks', 'prettier'],
  parser: 'babel-eslint',
  globals: {
    window: true,
    document: true,
    localStorage: true,
  },
  env: {
    jest: true,
  },
  rules: {
    "no-array-index-key": 0,
    "no-nested-ternary": 0,
    "no-param-reassign": ["error", { "props": false }],
    'react/jsx-indent': 0,
    'no-confusing-arrow': 0,
    'jsx-quotes': ['error', 'prefer-single'],
    'linebreak-style': 0,
    'react/display-name': 0,
    'import/no-absolute-path': 0,
    'global-require': 0,
    'no-useless-catch': 0,
    'no-unneeded-ternary': 0,
    'lines-between-class-members': 0,
    'eol-last': 'error',
    'react/prop-types': 0,
    'import/prefer-default-export': 0,
    'import/no-extraneous-dependencies': 0,
    'import/no-unresolved': 1,
    'react/jsx-props-no-spreading': 0,
    'react/destructuring-assignment': 0,
    'react/button-has-type': 0,
    'react/jsx-first-prop-new-line': [1, 'multiline'],
    'react/jsx-closing-bracket-location': [1, 'tag-aligned'],
    'react/jsx-max-props-per-line': [
      1,
      {
        when: 'multiline',
        maximum: 3,
      },
    ],
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js'],
      },
    ],
    'react/jsx-tag-spacing': 1,
    'prettier/prettier': [
      'error',
      {
        trailingComma: 'es5',
        singleQuote: true,
        printWidth: 80,
        endOfLine: 'auto',
        jsxSingleQuote: true,
      },
    ],
    "jsx-a11y/label-has-associated-control": "off",
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['./src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
