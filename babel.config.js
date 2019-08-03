const IS_PROD = process.env.NODE_ENV === 'production';

// 按需加载element-ui
const plugins = [
  [
    'component',
    {
      'libraryName': 'element-ui',
      'styleLibraryName': 'theme-chalk'
    }
  ]
];

if (IS_PROD) {
  plugins.unshift([
    'transform-remove-console',
    {
      exclude: ['error', 'warn']
    }
  ]);
}
module.exports = {
  presets: [
    '@vue/app'
  ],
  // plugins
};
