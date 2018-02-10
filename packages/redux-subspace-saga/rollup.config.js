import babel from 'rollup-plugin-babel'
import pkg from './package.json'

const externalList = [
	...Object.keys(pkg.dependencies || {}),
	...Object.keys(pkg.peerDependencies || {}),
]
const external = new RegExp(`^(${ externalList.join('|') })($|/)`)

export default {
	input: 'src/index.js',
	output: [
		{ format: 'es', file: pkg.module },
		{ format: 'cjs', file: pkg.main, exports: 'named' }
	],
	external: id => external.test(id),
	plugins: [
		babel({
			plugins: ['external-helpers']
		})
	]
}
