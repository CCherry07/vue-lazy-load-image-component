import { mount } from '@vue/test-utils';
import mock from 'mockjs';
import { expect, describe } from 'vitest';
import LazyLoadImage from '../LazyLoadImage.tsx';
describe('LazyLoadImage', async () => {
  // mock imgs
  const imgs = mock.mock({
    'list|10': [
      {
        'id|+1': 1,
        url: '@image(100x100, @color, @color, @word)',
      },
    ],
  }).list;

  it('should render correctly', async () => {
    const wrapper = mount(LazyLoadImage, {
      props: {
        height: 100,
        width: 100,
        src: imgs[0].url,
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
  it('should render correctly with effect', async () => {
    const wrapper = mount(LazyLoadImage, {
      props: {
        height: 100,
        width: 100,
        src: imgs[0].url,
        effect: 'blur',
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
