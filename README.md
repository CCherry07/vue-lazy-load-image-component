
## Installation

```bash
# Yarn
$ yarn add vue-lazy-load-image-component

# NPM
$ npm i --save vue-lazy-load-image-component
```

## `LazyLoadImage` usage

```javascript
import React from 'react';
import { LazyLoadImage } from 'vue-lazy-load-image-component';

const MyImage = ({ image }) => (
  <div>
    <LazyLoadImage
      alt={image.alt}
      height={image.height}
      src={image.src} // use normal <img> attributes as props
      width={image.width} />
    <span>{image.caption}</span>
  </div>
);

export default MyImage;
```

### Props

| Prop | Type | Default | Description |
|:---|:---|:---|:---|
| afterLoad | `Function` |  | Function called after the image has been completely loaded. |
| beforeLoad | `Function` |  | Function called right before the placeholder is replaced with the image element. |
| delayMethod | `String` | `throttle` | Method from lodash to use to delay the scroll/resize events. It can be `throttle` or `debounce`. |
| delayTime | `Number` | 300 | Time in ms sent to the delayMethod. |
| effect | `String` |  | Name of the effect to use. Please, read next section with an explanation on how to use them. |
| placeholder | `ReactClass` | `<span>` | React element to use as a placeholder. |
| placeholderSrc | `String` | | Image src to display while the image is not visible or loaded. |
| threshold | `Number` | 100 | Threshold in pixels. So the image starts loading before it appears in the viewport. |
| useIntersectionObserver | `Boolean` | true | Whether to use browser's IntersectionObserver when available. |
| visibleByDefault | `Boolean` | false | Whether the image must be visible from the beginning. |
| wrapperClassName | `String` |  | In some occasions (for example, when using a placeholderSrc) a wrapper span tag is rendered. This prop allows setting a class to that element. |
| wrapperProps | `Object` | null | Props that should be passed to the wrapper span when it is rendered (for example, when using placeholderSrc or effect) |
| ... |  |  | Any other image attribute |

### Using effects

`LazyLoadImage` includes several effects ready to be used, they are useful to add visual candy to your application, but are completely optional in case you don't need them or want to implement you own effect.

They rely on CSS and the corresponding CSS file must be imported:

```vue
<template>
  <div>
    <MyImage :image="image" />
  </div>
</template>
<script lang='ts' setup>
import { LazyLoadImage } from 'vue-lazy-load-image-component';
import 'vue-lazy-load-image-component/lib/style.css';
const image = ref({
  alt: 'My image',
  height: 100,
  src: 'https://example.com/image.jpg',
  width: 100,
});
</script>
```

The current available effects are:

* `blur`: renders a blurred image based on `placeholderSrc` and transitions to a non-blurred one when the image specified in the src is loaded.

![Screenshot of the blur effect](https://user-images.githubusercontent.com/3616980/37790728-9f95529a-2e07-11e8-8ac3-5066c065e0af.gif)

* `black-and-white`: renders a black and white image based on `placeholderSrc` and transitions to a colorful image when the image specified in the src is loaded.

![Screenshot of the black-and-white effect](https://user-images.githubusercontent.com/3616980/37790682-864e58d6-2e07-11e8-8984-ad5d7b056d9f.gif)

* `opacity`: renders a blank space and transitions to full opacity when the image is loaded.

![Screenshot of the opacity effect](https://user-images.githubusercontent.com/3616980/37790755-b48a704a-2e07-11e8-91c3-fcd43a91e7b1.gif)

## `LazyLoadComponent` usage

```vue
<template>
  <div>
    <LazyLoadComponent>
      <MyComponent />
    </LazyLoadComponent>
  </div>
</template>
<script lang='ts' setup>
import { LazyLoadComponent } from 'vue-lazy-load-image-component';
import MyComponent from './MyComponent.vue';
</script>
```

### Props

| Prop | Type | Default | Description |
|:---|:---|:---|:---|
| afterLoad | `Function` |  | Function called after the component has been rendered. |
| beforeLoad | `Function` |  | Function called right before the component is rendered. |
| delayMethod | `String` | `throttle` | Method from lodash to use to delay the scroll/resize events. It can be `throttle` or `debounce`. |
| delayTime | `Number` | 300 | Time in ms sent to the delayMethod from lodash. |
| placeholder | `ReactClass` | `<span>` | React element to use as a placeholder. |
| threshold | `Number` | 100 | Threshold in pixels. So the component starts loading before it appears in the viewport. |
| useIntersectionObserver | `Boolean` | true | Whether to use browser's IntersectionObserver when available. |
| visibleByDefault | `Boolean` | false | Whether the component must be visible from the beginning. |

## Using `trackWindowScroll` HOC to improve performance

When you have many elements to lazy load in the same page, you might get poor performance because each one is listening to the scroll/resize events. In that case, it's better to wrap the deepest common parent of those components with a HOC to track those events (`trackWindowScroll`).

For example, if we have an `App` which renders a `Gallery`, we would wrap the `Gallery` component with the HOC.

```vue
<template>
  <div>
    <GalleryWithScrollTracking :images="images" />
  </div>
</template>
<script lang='ts' setup>
import { trackWindowScroll } from 'vue-lazy-load-image-component';
import Gallery from './Gallery.vue';
// Wrap Gallery with trackWindowScroll HOC so it receives
// a scrollPosition prop to pass down to the images
const images = ref([
  {
    alt: 'My image',
    height: 100,
    src: 'https://example.com/image.jpg',
    width: 100,
    scrollPosition:{x:0,y:0}
  },
  {
    alt: 'My image 2',
    height: 100,
    src: 'https://example.com/image2.jpg',
    width: 100,
    scrollPosition:{x:0,y:0}
  },
]);

const GalleryWithScrollTracking = trackWindowScroll(Gallery);

</script>
```

You must set the prop `scrollPosition` to the lazy load components. This way, they will know the scroll/resize events are tracked by a parent component and will not subscribe to them.

### Props

`LazyLoadImage`

| Prop | Type | Default | Description |
|:---|:---|:---|:---|
| scrollPosition | `Object` |  | Object containing `x` and `y` with the curent window scroll position. Required. |
| afterLoad | `Function` |  | Function called after the image has been rendered. |
| beforeLoad | `Function` |  | Function called right before the image is rendered. |
| placeholder | `ReactClass` | `<span>` | React element to use as a placeholder. |
| threshold | `Number` | 100 | Threshold in pixels. So the image starts loading before it appears in the viewport. |
| visibleByDefault | `Boolean` | false | Whether the image must be visible from the beginning. |
| wrapperProps | `Object` | null | Props that should be passed to the wrapper span when it is rendered (for example, when using placeholderSrc or effect) |
| ... |  |  | Any other image attribute |

Component wrapped with `trackWindowScroll` (in the example, `Gallery`)

| Prop | Type | Default | Description |
|:---|:---|:---|:---|
| delayMethod | `String` | `throttle` | Method from lodash to use to delay the scroll/resize events. It can be `throttle` or `debounce`. |
| delayTime | `Number` | 300 | Time in ms sent to the delayMethod from lodash. |
| useIntersectionObserver | `Boolean` | true | Whether to use browser's IntersectionObserver when available. |

Notice you can do the same replacing `LazyLoadImage` with `LazyLoadComponent`.

## When to use `visibleByDefault`?

The prop `visibleByDefault` makes the LazyLoadImage to behave like a normal `<img>`. Why is it useful, then?

Imagine you are going to lazy-load an image you have already loaded in the same page. In that case, there is no need to lazy-load it because it's already stored in the cache of the user's browser. You can directly display it.

Maybe the following code snippet will make it more clear:

```vue
<template>
  <div>
    <img src="/landscape.jpg" alt="Beautiful landscape" />
    <GalleryWithScrollTracking :images="images" />
  </div>
</template>
<script lang='ts' setup>
import { trackWindowScroll } from 'vue-lazy-load-image-component';
import Gallery from './Gallery.vue';
const images = ref([
  {
    alt: 'My image',
    height: 100,
    src: 'https://example.com/image.jpg',
    width: 100,
  },
  {
    alt: 'My image 2',
    height: 100,
    src: 'https://example.com/image2.jpg',
    width: 100,
    // If the image we are creating here has the same src than before,
    // we can directly display it with no need to lazy-load.
    visibleByDefault:image.src === '/landscape.jpg',
  },
]);

const GalleryWithScrollTracking = trackWindowScroll(Gallery);

</script>
```
