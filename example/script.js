import PureMasonry from '../dist/pure-masonry.esm.js';
import more_images from './more_images.json' assert { type: 'json' };

const masonry = new PureMasonry('.images-wrapper', {
  columns: 1,
  columnGap: 10,
  // itemClass: 'gray',
  breakpoints: {
    1200: {
      columns: 4,
      columnGap: 10,
    },
    991: {
      columns: 3,
      columnGap: 20,
    },
    480: {
      columns: 2,
      columnGap: 15,
    },
  },
  events: {
    init: instance => {
      console.log('Init: ', instance);
      const wrapper = document.querySelector('.images-wrapper');
      wrapper.classList.add('show');
    },
    relayout: instance => {
      console.log('Relayout: ', instance);
    },
    append: instance => {
      console.log('Append: ', instance);
    },
  },
});

const loadMore = document.querySelector('#load-more');
let loading = false;
window.addEventListener('scroll', () => {
  if (loading) {
    return;
  }

  if (window.scrollY + window.innerHeight > loadMore.offsetTop) {
    loading = true;

    const srcs = more_images;
    const imgs = srcs.map(s => {
      const img = document.createElement('img');
      img.src = s;
      return img;
    });

    masonry.appendItems(imgs);
  }
});
