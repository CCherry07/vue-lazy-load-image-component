// LazyLoadComponent test
import { mount } from '@vue/test-utils';
import { expect } from 'vitest';
import LazyLoadComponent from '../LazyLoadComponent.tsx';

test('LazyLoadComponent', async () => {
  const wrapper = mount(LazyLoadComponent, {
    props: {
      height: 100,
      width: 100,
    },
  });
  expect(wrapper.html()).toMatchSnapshot();
});
