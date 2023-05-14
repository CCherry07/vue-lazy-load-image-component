import { reactive, computed, watch, defineComponent, ExtractPropTypes } from 'vue'
import PlaceholderWithoutTracking from './PlaceholderWithoutTracking.tsx'
import isIntersectionObserverAvailable from '../utils/intersection-observer';
import PlaceholderWithTracking from './PlaceholderWithTracking.tsx'
import { LazyLoadComponentPropsFunc } from "./interface.ts";

export type LazyLoadComponentProps = Partial<ExtractPropTypes<ReturnType<typeof LazyLoadComponentPropsFunc>>>

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'LazyLoadComponent',
  inheritAttrs: false,
  props: LazyLoadComponentPropsFunc(),
  setup(props, { slots }) {
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
      state.visible = true
      props.afterLoad?.()
    }

    if (props.visibleByDefault) {
      props.beforeLoad?.()
      props.afterLoad?.()
    }
    return () => {
      if (state.visible) {
        return slots.default?.()
      }
      return isScrollTracked ||
        (props.useIntersectionObserver && isIntersectionObserverAvailable()) ?
        <PlaceholderWithoutTracking
          height={props.height}
          onVisible={onVisible}
          placeholder={props.placeholder}
          scrollPosition={props.scrollPosition}
          threshold={props.threshold}
          useIntersectionObserver={props.useIntersectionObserver}
          width={props.width}
        />
        :
        <PlaceholderWithTracking
          height={props.height}
          onVisible={onVisible}
          placeholder={props.placeholder}
          scrollPosition={props.scrollPosition}
          threshold={props.threshold}
          useIntersectionObserver={props.useIntersectionObserver}
          width={props.width}
        />
    }
  }
})

