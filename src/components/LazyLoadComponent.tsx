import { reactive, computed, watch, defineComponent } from 'vue'
import PlaceholderWithoutTracking from './PlaceholderWithoutTracking.tsx'
import isIntersectionObserverAvailable from '../utils/intersection-observer';
import PlaceholderWithTracking from './PlaceholderWithTracking.tsx'
// interface ScrollPosition {
//   x: number
//   y: number
// }
// interface Props {
//   afterLoad?: () => void
//   beforeLoad?: () => void
//   scrollPosition: ScrollPosition
//   visibleByDefault?: boolean
//   style: CSSProperties
//   height: number
//   width: number
//   useIntersectionObserver: any
//   threshold: number
// }
export default defineComponent({
  name: 'LazyLoadComponent',
  props: {
    afterLoad: {
      type: Function,
      default: () => { }
    },
    beforeLoad: {
      type: Function,
      default: () => { }
    },
    scrollPosition: {
      type: Object,
      default: null
    },
    visibleByDefault: {
      type: Boolean,
      default: false
    },
    height: {
      type: Number,
      default: 0
    },
    width: {
      type: Number,
      default: 0
    },
    useIntersectionObserver: {
      type: Boolean,
      default: true
    },
    threshold: {
      type: Number,
      default: 300
    },
    style: {
      type: Object,
      default: () => { }
    },
    class: {
      type: String,
      default: ''
    },
    delayMethod: {
      type: String,
      default: 'throttle'
    },
    delayTime: {
      type: Number,
      default: 300
    },
    placeholder: {
      type: Object,
      default: () => { }
    }

  },
  setup(props, { slots, attrs }) {
    const state = reactive({
      visible: props.visibleByDefault ?? false,
      loaded: false,
      error: false,
    })
    const isScrollTracked = computed(() => Boolean(
      props.scrollPosition &&
      Number.isFinite(props.scrollPosition.x) &&
      props.scrollPosition.x >= 0 &&
      Number.isFinite(props.scrollPosition.y) &&
      props.scrollPosition.y >= 0
    ))

    watch(state,
      (prevState, state) => {
        if (prevState.visible !== state?.visible) {
          props.afterLoad?.();
        }
      },
      { immediate: true }
    )

    const onVisible = () => {
      if (state.loaded) return
      state.loaded = true
      state.visible = true
      props.afterLoad?.()
    }

    if (props.visibleByDefault) {
      props.afterLoad?.()
      props.afterLoad?.()
    }

    return () => {
      return isScrollTracked ||
        (props.useIntersectionObserver && isIntersectionObserverAvailable()) ?
        <>
          <PlaceholderWithoutTracking
            height={props.height}
            onVisible={onVisible}
            // placeholder={props.placeholder}
            scrollPosition={props.scrollPosition}
            threshold={props.threshold}
            useIntersectionObserver={props.useIntersectionObserver}
            width={props.width}
          >
            {slots.default?.()}
          </PlaceholderWithoutTracking>
        </>
        :
        <>
          <PlaceholderWithTracking
            height={props.height}
            onVisible={onVisible}
            // placeholder={props.placeholder}
            scrollPosition={props.scrollPosition}
            threshold={props.threshold}
            useIntersectionObserver={props.useIntersectionObserver}
            width={props.width}
          >
            {slots.default?.()}
          </PlaceholderWithTracking>
        </>
    }
  }
})

