import { terser } from 'rollup-plugin-terser';

export default [
	{
		input: 'src/index.js',
		output:
		{
			file: 'twinject.js',
			plugins: [
				terser(),
			]
		},
	},
];
