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

// 去除console
if (IS_PROD) {
  plugins.unshift([
    'transform-remove-console',
    {
      exclude: ['error', 'warn', 'log']
    }
  ]);
}
module.exports = {
  presets: [
    '@vue/app'
  ],
  // plugins
};
