import babel from 'rollup-plugin-babel';

export default {
  entry: 'src/roun.js',
  dest: 'roun.js',
  plugins: [
    babel({exclude: 'node_modules/**'}),
  ],
  format: 'umd',
  moduleName: 'roun',
};
