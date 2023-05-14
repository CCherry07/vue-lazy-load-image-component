import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  shallowRef,
  watch,
  onBeforeUnmount,
} from 'vue';
import { debounce, throttle } from 'lodash-es';
import isIntersectionObserverAvailable from '../utils/intersection-observer';
import getScrollAncestor from '../utils/get-scroll-ancestor';
import { getScrollX, getScrollY } from '../utils';
import { LazyLoadComponentPropsFunc } from './interface';

export type TrackWindowScroll = (
  Component: ReturnType<typeof defineComponent>,
) => ReturnType<typeof defineComponent>;

export const trackWindowScroll: TrackWindowScroll = (Component) => {
  const ScrollAwareComponent = defineComponent({
    name: 'ScrollAwareComponent',
    props: LazyLoadComponentPropsFunc(),
    setup(props, { attrs }) {
      const useIntersectionObserver = computed(
        () => props.useIntersectionObserver && isIntersectionObserverAvailable(),
      );
      const baseComponentRef = shallowRef(null);
      const scrollPosition = reactive({
        x: getScrollX(),
        y: getScrollY(),
      });
      if (!useIntersectionObserver.value) {
        return null;
      }
      function onChangeScroll() {
        if (useIntersectionObserver.value) {
          return;
        }
        scrollPosition.x = getScrollX();
        scrollPosition.y = getScrollY();
      }
      const scrollElement = computed(() => getScrollAncestor(baseComponentRef.value!));
      function addListeners() {
        if (typeof window === 'undefined' || useIntersectionObserver) {
          return;
        }
        scrollElement.value.addEventListener('scroll', onChangeScroll);
        window.addEventListener('resize', onChangeScroll);
        if (scrollElement.value !== document.body) {
          window.addEventListener('scroll', onChangeScroll);
        }
      }
      function removeListeners() {
        if (typeof window === 'undefined' || useIntersectionObserver) {
          return;
        }
        scrollElement.value.removeEventListener('scroll', onChangeScroll);
        window.removeEventListener('resize', onChangeScroll);
        if (scrollElement.value !== document.body) {
          window.removeEventListener('scroll', onChangeScroll);
        }
      }
      onMounted(() => {
        addListeners();
      });

      onBeforeUnmount(() => {
        removeListeners();
      });

      watch(scrollElement, (_, preScrollElement) => {
        if (preScrollElement) {
          removeListeners();
        }
        addListeners();
      });

      const delayedScroll =
        props.delayMethod === 'debounce'
          ? debounce(onChangeScroll, props.delayTime)
          : throttle(onChangeScroll, props.delayTime);

      return () => (
        <Component
          {...props}
          {...attrs}
          scrollPosition={scrollPosition}
          ref={baseComponentRef}
          onChangeScroll={delayedScroll}
        />
      );
    },
  });
  return ScrollAwareComponent;
};

export default trackWindowScroll;
