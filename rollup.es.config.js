import babel from 'rollup-plugin-babel';

export default {
  entry: 'src/roun.js',
  dest: 'es/roun.js',
  plugins: [
    babel({exclude: 'node_modules/**'}),
  ]
};
