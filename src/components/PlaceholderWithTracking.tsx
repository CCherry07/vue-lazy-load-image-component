import { defineComponent } from 'vue';
import { trackWindowScroll } from './trackWindowScroll.tsx';
import PlaceholderWithoutTracking from './PlaceholderWithoutTracking';
import { PlaceholderWithTrackingPropsFunc } from './interface.ts';
const PlaceholderWithTracking = defineComponent({
  name: 'PlaceholderWithTracking',
  props: PlaceholderWithTrackingPropsFunc(),
  setup(props) {
    return () => <PlaceholderWithoutTracking {...props} />;
  },
});

export default trackWindowScroll(PlaceholderWithTracking);
