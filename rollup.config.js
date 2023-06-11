import terser from '@rollup/plugin-terser';

export default {
  input: './lib/index.js',
  output: [
    {
      file: './dist/pure-masonry-grid.js',
      format: 'iife',
      name: 'PureMasonryGrid',
    },
    {
      file: './dist/pure-masonry-grid.min.js',
      format: 'iife',
      name: 'PureMasonryGrid',
      plugins: [terser({ keep_classnames: true })],
    },
    {
      file: './dist/pure-masonry-grid.esm.js',
      format: 'es',
    },
    {
      file: './dist/pure-masonry-grid.esm.min.js',
      format: 'es',
      plugins: [terser({ keep_classnames: true })],
    },
  ],
};
