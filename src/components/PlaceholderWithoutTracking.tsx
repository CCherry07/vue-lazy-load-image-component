// import type { CSSProperties } from 'vue'
import { computed, onMounted, shallowRef, defineComponent } from 'vue'

import isIntersectionObserverAvailable from '../utils/intersection-observer'
import { getObserver } from '../utils'
// interface ScrollPosition {
//   x: number
//   y: number
// }
// interface Props {
//   scrollPosition: ScrollPosition
//   useIntersectionObserver: boolean
//   threshold: number
//   onVisible: () => void
//   style: CSSProperties
//   height: number
//   width: number
// }

export default defineComponent({
  name: 'PlaceholderWithoutTracking',
  props: {
    scrollPosition: {
      type: Object,
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
      type: Function,
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
    placeholder: {
      type: Object,
      default: () => { }
    }
  },
  setup(props) {
    const placeholder = shallowRef<HTMLElement>()
    const supportsObserver = computed(() => !props.scrollPosition &&
      props.useIntersectionObserver &&
      isIntersectionObserverAvailable())

    const observer = computed(() => {
      if (!supportsObserver.value) return null
      return getObserver(props.threshold)
    })

    function getPlaceholderBoundingBox(scrollPosition = props.scrollPosition) {
      const boundingRect = placeholder.value!.getBoundingClientRect();
      const style = placeholder.value!.style;
      const margin = {
        left: parseInt(style.getPropertyValue('margin-left'), 10) || 0,
        top: parseInt(style.getPropertyValue('margin-top'), 10) || 0,
      };

      return {
        bottom: scrollPosition.y + boundingRect.bottom + margin.top,
        left: scrollPosition.x + boundingRect.left + margin.left,
        right: scrollPosition.x + boundingRect.right + margin.left,
        top: scrollPosition.y + boundingRect.top + margin.top,
      };
    }
    function isPlaceholderInViewport() {
      if (typeof window === 'undefined' || placeholder.value) {
        return false;
      }
      const boundingBox = getPlaceholderBoundingBox(props.scrollPosition);
      const viewport = {
        bottom: props.scrollPosition.y + window.innerHeight,
        left: props.scrollPosition.x,
        right: props.scrollPosition.x + window.innerWidth,
        top: props.scrollPosition.y,
      };

      return Boolean(
        viewport.top - props.threshold <= boundingBox.bottom &&
        viewport.bottom + props.threshold >= boundingBox.top &&
        viewport.left - props.threshold <= boundingBox.right &&
        viewport.right + props.threshold >= boundingBox.left
      );
    }
    function updateVisibility() {
      if (isPlaceholderInViewport()) {
        props.onVisible?.();
      }
    }
    onMounted(() => {
      if (observer.value && placeholder.value) {
        // @ts-ignore
        placeholder.value.onVisible = props.onVisible
        observer.value.observe(placeholder.value)
      }
      if (!supportsObserver.value) {
        updateVisibility?.()
      }
    })

    const styleProp = computed(() => {
      return {
        display: 'inline-block',
        height: `${props.height}px`,
        width: `${props.width}px`,
      }
    });

    return () => {
      return (
        <span
          ref={placeholder}
          style={styleProp.value}
        >
          {props.placeholder}
        </span>
      )
    }
  }
})
