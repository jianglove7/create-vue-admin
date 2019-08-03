module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  plugins: ['vue'],
  rules: {
    // allow async-await
    // 'generator-star-spacing': 'off',
    'space-before-function-paren': 'off',
    // quotes: 'off',
    // semi: 'off',
    'eol-last': 'off',
    'no-trailing-spaces': 'off',
    'no-unused-vars': 1,
    // 'no-tabs': 'off',
    // 'no-multi-spaces': 'off',
    // 'indent': 'off',
    'comma-dangle': 'off',

    'no-throw-literal': 0, // 允许用字面量{}抛出异常
    'arrow-parens': 0,
    'semi': [2, 'always'], // 语句强制分号结尾
    'indent': [1, 2, { // 缩进风格
      'SwitchCase': 1
    }],
    'one-var': 0, // 一个let或者var只能生命一个变量
    'generator-star-spacing': 0,

    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  globals: {

  }
}
