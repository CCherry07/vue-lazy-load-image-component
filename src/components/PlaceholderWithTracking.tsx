import { defineComponent } from 'vue'
import { WrappedComponent } from './warpper.tsx'
import PlaceholderWithoutTracking from './PlaceholderWithoutTracking'
const PlaceholderWithTracking = defineComponent({
  name: 'PlaceholderWithTracking',
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
    }
  },
  setup(props, { attrs }) {
    return () => (
      <PlaceholderWithoutTracking {...props} {...attrs} />
    )
  }
})

export default WrappedComponent(PlaceholderWithTracking)
