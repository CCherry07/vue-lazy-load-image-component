import { PropType, defineComponent } from 'vue'
import { trackWindowScroll } from './trackWindowScroll.tsx'
import PlaceholderWithoutTracking from './PlaceholderWithoutTracking'
import { ScrollPosition, VueNode } from './interface.ts'
const PlaceholderWithTracking = defineComponent({
  name: 'PlaceholderWithTracking',
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
    placeholder:{
      type: Object as PropType<VueNode>,
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
