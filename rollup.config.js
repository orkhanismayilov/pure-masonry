import terser from '@rollup/plugin-terser';

export default {
  input: './lib/index.js',
  output: [
    {
      file: './dist/pure-masonry.js',
      format: 'iife',
      name: 'PureMasonry',
    },
    {
      file: './dist/pure-masonry.min.js',
      format: 'iife',
      name: 'PureMasonry',
      plugins: [terser({ keep_classnames: true })],
    },
    {
      file: './dist/pure-masonry.esm.js',
      format: 'es',
    },
    {
      file: './dist/pure-masonry.esm.min.js',
      format: 'es',
      plugins: [terser({ keep_classnames: true })],
    },
  ],
};
