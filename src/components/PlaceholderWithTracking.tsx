import { defineComponent } from 'vue'
import { trackWindowScroll } from './trackWindowScroll.tsx'
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
    },
    placeholder:{
      type: Object,
      default: () => { }
    }
  },
  setup(props, { attrs }) {
    return () => (
      <PlaceholderWithoutTracking {...props} {...attrs} />
    )
  }
})

export default trackWindowScroll(PlaceholderWithTracking)
