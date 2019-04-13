module.exports = {
  'extends': [
    'airbnb',
    'prettier',
    'prettier/react',
  ],
  'rules': {
    'no-plusplus': [2, {
      'allowForLoopAfterthoughts': true,
    }],
    'jsx-a11y/label-has-associated-control': [ 2, {
      'assert': 'either',
    }],
  },
  'globals': {
    'fetch': false,
    'document': false,
  },
};
