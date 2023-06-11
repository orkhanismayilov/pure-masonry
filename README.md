# pure-masonry-grid

Masonry Grid without absolute positioning and css

## Website and Examples

In development...

## Docs

### Getting Started

---

Adding to project via npm

```
npm i pure-masonry-grid
```

or just download the files and include in your HTML via scripts tags as follows

```
<script src="pure-masonry-grid/dist/pure-masonry-grid.min.js"></script>
```

### Initializing

---

The following HTML markup should be maintained:

```
<div id="my-masonry-grid">
  <div>Grid Item 1</div>
  <div>Grid Item 2</div>
  <div>Grid Item 3</div>
  ...
</div>
```

In js file:

```
const masonry = new PureMasonryGrid('#my-masonry-grid', //config goes here);
```

Now you can see the masonry grid with default config. Available config is described below.

### Config

---

### `columns (default: 4)`: number

The count of columns.

#### `columnGap (default: 16)`: number

Horizontal gap between grid items in **px**.

#### `rowGap (default: columnGap)`: number

Vertical gap between grid items in **px**.

#### `itemClass`: string

Class added to all grid items individually.

#### `breakpoints`: { [key: number]: { ...config } }

Adds responsive breakpoints for custom layouts on different screen sizes. Gets an object with keys as min-width of the screen for media query and values as minimum config object:

```
{
  // 1 column and 10px gap if window width < 480px
  // as the minimum provided breakpoint is 480
  columns: 1,
  columnGap: 10,
  breakpoints: {
    // 4 columns and 10px gap if window width >= 1200px
    1200: {
      columns: 4,
      columnGap: 10,
    },
    // 3 columns and 20px gap if window width >= 992px
    992: {
      columns: 3,
      columnGap: 20,
    },
    // 2 columns and 15px gap if window width >= 480px
    480: {
      columns: 2,
      columnGap: 15,
    },
  },
}
```

### Events

---

All event callbacks get instance of the class as first argument.

```
{
  events: {
    init: instance => {
      console.log('Init: ', instance);
    },
    relayout: instance => {
      console.log('Relayout: ', instance);
    },
    append: instance => {
      console.log('Append: ', instance);
    },
  },
}
```

#### `init`: (instance) => {}

Event is fired after grid is initialized and layout is ready.

#### `relayout`: (instance) => {}

Event is fired after the layout has been updated if `breakpoints` config object has been provided.

#### `append`: (instance) => {}

Event is fired after new grid items has been appended via `appendItems` method.

### Methods

---

#### `appendItems`

In case if you need to append new items into grid. It accepts as argument array of HTMLElements. Example of infinite scroll with dummy data:

```
// dummy data
const srcs = [
  '/img1.jpg',
  '/img2.jpg',
  '/img3.jpg',
  ...
];
const masonry = new PureMasonryGrid('#my-masonry-grid');
const loadMore = document.querySelector('#load-more');
let loading = false;

window.addEventListener('scroll', () => {
  if (loading) {
    return;
  }

  if (window.scrollY + window.innerHeight > loadMore.offsetTop) {
    loading = true;

    // create array of HTMLImageElement with src from dummy data
    const images = srcs.map(src => {
      const img = document.createElement('img');
      img.src = src;

      return img;
    });

    // call appendItems method with array of HTMLImageElement as argument
    masonry.appendItems(images);
  }
});
```

**_NOTE_**: `append` callback function, if specified in config, is executed after items appended.
