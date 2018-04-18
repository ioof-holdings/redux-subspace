const { BABEL_ENV, NODE_ENV } = process.env

const cjs = BABEL_ENV === 'cjs' || NODE_ENV === 'test'

module.exports = {
  presets: [
    ['env', { loose: true, modules: false }],
    'react',
    'stage-3',
  ],
  plugins: [
	'annotate-pure-calls',
    cjs && 'transform-es2015-modules-commonjs',
  ].filter(Boolean),
}
