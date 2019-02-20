const { BABEL_ENV, NODE_ENV } = process.env

const cjs = BABEL_ENV === 'cjs' || NODE_ENV === 'test'

module.exports = {
  presets: [
    ['@babel/env', { loose: true, modules: false }],
    '@babel/react'
  ],
  plugins: [
    '@babel/proposal-class-properties',
    '@babel/proposal-object-rest-spread',
	  'annotate-pure-calls',
    cjs && '@babel/transform-modules-commonjs',
  ].filter(Boolean),
}
