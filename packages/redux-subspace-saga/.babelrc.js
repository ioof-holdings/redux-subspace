const { BABEL_ENV, NODE_ENV } = process.env

const cjs = BABEL_ENV === 'cjs' || NODE_ENV === 'test'

module.exports = {
  presets: [
    ['env', { loose: true, modules: false }],
    'react',
    'stage-3',
  ],
  plugins: [
    cjs && 'transform-es2015-modules-commonjs',
    ['transform-runtime', {
      helpers: false,
      polyfill: false,
    }],
  ].filter(Boolean),
}
