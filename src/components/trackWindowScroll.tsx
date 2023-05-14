import type { PropType } from 'vue'
import { computed, defineComponent, onMounted, reactive, shallowRef, watch, onBeforeUnmount } from "vue";
import { debounce, throttle } from 'lodash-es';
import isIntersectionObserverAvailable from '../utils/intersection-observer';
import getScrollAncestor from '../utils/get-scroll-ancestor';
import { getScrollX, getScrollY } from "../utils";
import { ScrollPosition, VueNode } from "./interface";

export type TrackWindowScroll = (Component: ReturnType<typeof defineComponent>) => ReturnType<typeof defineComponent>

export const trackWindowScroll: TrackWindowScroll = (Component) => {
  const ScrollAwareComponent = defineComponent({
    name: "ScrollAwareComponent",
    props: {
      scrollPosition: {
        type: Object as PropType<ScrollPosition>,
        default: null
      },
      useIntersectionObserver: {
        type: Boolean,
        default: true
      },
      threshold: {
        type: Number,
        default: 300
      },
      onVisible: {
        type: Function as PropType<() => void>,
        default: () => { }
      },
      height: {
        type: Number,
        default: 0
      },
      width: {
        type: Number,
        default: 0
      },
      delayMethod: {
        type: String as PropType<'debounce' | 'throttle'>,
        default: 'throttle'
      },
      delayTime: {
        type: Number,
        default: 300
      },
      placeholder: {
        type: Object as PropType<VueNode>,
        default: () => { }
      }
    },
    setup(props, { attrs }) {
      const useIntersectionObserver = computed(() => props.useIntersectionObserver && isIntersectionObserverAvailable())
      const baseComponentRef = shallowRef(null)
      const scrollPosition = reactive({
        x: getScrollX(),
        y: getScrollY(),
      });
      if (!useIntersectionObserver) {
        return null
      }
      function onChangeScroll() {
        if (useIntersectionObserver) {
          return;
        }
        scrollPosition.x = getScrollX();
        scrollPosition.y = getScrollY();
      }
      const scrollElement = computed(() => getScrollAncestor(baseComponentRef.value!))
      function addListeners() {
        if (typeof window === 'undefined' || useIntersectionObserver) {
          return;
        }
        scrollElement.value.addEventListener('scroll', onChangeScroll)
        window.addEventListener('resize', onChangeScroll)
        if (scrollElement.value !== document.body) {
          window.addEventListener('scroll', onChangeScroll)
        }
      }
      function removeListeners() {
        if (typeof window === 'undefined' || useIntersectionObserver) {
          return;
        }
        scrollElement.value.removeEventListener('scroll', onChangeScroll)
        window.removeEventListener('resize', onChangeScroll)
        if (scrollElement.value !== document.body) {
          window.removeEventListener('scroll', onChangeScroll)
        }
      }
      onMounted(() => {
        addListeners()
      })

      onBeforeUnmount(() => {
        removeListeners()
      })

      watch(scrollElement, (_, preScrollElement) => {
        if (preScrollElement) {
          removeListeners()
        }
        addListeners()
      })

      const delayedScroll = props.delayMethod === 'debounce' ? debounce(onChangeScroll, props.delayTime) : throttle(onChangeScroll, props.delayTime);

      return () => (<Component {...props} {...attrs} scrollPosition={scrollPosition} ref={baseComponentRef} onChangeScroll={delayedScroll} />)
    }
  })
  return ScrollAwareComponent;
}


export default trackWindowScroll;
