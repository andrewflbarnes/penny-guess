module.exports = {
  'extends': [
    'airbnb',
    'prettier',
    'prettier/react',
  ],
  'rules': {
    'no-plusplus': ["error", {
      'allowForLoopAfterthoughts': true,
    }],
    'jsx-a11y/label-has-associated-control': ["error", {
      'assert': 'either',
    }],
  },
  'globals': {
    'fetch': false,
    'document': false,
  },
  'overrides': [
    {
      "files": ["src/test/**/*.js", "src/test/**/*.jsx"],
      "rules": {
        "import/no-extraneous-dependencies": "off",
        "no-undef": "off",
      }
    },
    {
      "files": "src/mock/**/*.js",
      'rules': {
        'import/no-extraneous-dependencies': "off",
        'no-console': "off",
      },
    },
  ]
};
