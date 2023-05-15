import { defineComponent } from 'vue';
import { trackWindowScroll } from './trackWindowScroll.tsx';
import PlaceholderWithoutTracking from './PlaceholderWithoutTracking';
import { PlaceholderWithTrackingPropsFunc } from './interface.ts';
const PlaceholderWithTracking = defineComponent({
  compatConfig: { MODE: 3 },
  name: 'PlaceholderWithTracking',
  inheritAttrs: false,
  props: PlaceholderWithTrackingPropsFunc(),
  setup(props) {
    return () => <PlaceholderWithoutTracking {...props} />;
  },
});

export default trackWindowScroll(PlaceholderWithTracking);
