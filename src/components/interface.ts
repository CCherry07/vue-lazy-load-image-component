import type { CSSProperties, PropType, VNode } from 'vue';
declare type VNodeChildAtom = VNode | string | number | boolean | null | undefined | void;
export type VueNode = VNodeChildAtom | VNodeChildAtom[] | JSX.Element;
export interface ScrollPosition {
  x: number;
  y: number;
}
export const LazyLoadComponentPropsFunc = () => ({
  afterLoad: {
    type: Function as PropType<(payload?: Event) => void>,
    default: () => {},
  },
  beforeLoad: {
    type: Function as PropType<() => void>,
    default: () => {},
  },
  scrollPosition: {
    type: Object as PropType<ScrollPosition>,
    default: null,
  },
  visibleByDefault: {
    type: Boolean,
    default: false,
  },
  height: {
    type: Number,
    default: 0,
  },
  width: {
    type: Number,
    default: 0,
  },
  useIntersectionObserver: {
    type: Boolean,
    default: true,
  },
  threshold: {
    type: Number,
    default: 300,
  },
  style: {
    type: Object as PropType<Partial<CSSProperties>>,
    default: () => {},
  },
  class: {
    type: String,
    default: '',
  },
  delayMethod: {
    type: String,
    default: 'throttle',
  },
  delayTime: {
    type: Number,
    default: 300,
  },
  placeholder: {
    type: Object as PropType<VueNode>,
    default: () => {},
  },
});

export type Effect = 'blur' | 'black-and-white' | 'opacity';
export const LazyLoadImagePropsFunc = () => {
  return {
    ...LazyLoadComponentPropsFunc(),
    onImageError: {
      type: Function as PropType<(payload: Event) => void>,
      default: () => {},
    },
    effect: {
      type: String as PropType<Effect>,
      default: '',
    },
    placeholderSrc: {
      type: String,
      default: '',
    },
    wrapperClassName: {
      type: String,
      default: '',
    },
    wrapperProps: {
      type: Object,
      default: () => ({}),
    },
    loadedClassName: {
      type: String,
      default: '',
    },
  };
};

export const PlaceholderWithoutTrackingPropsFunc = () => ({
  scrollPosition: {
    type: Object as PropType<ScrollPosition>,
    default: null,
  },
  useIntersectionObserver: {
    type: Boolean,
    default: true,
  },
  threshold: {
    type: Number,
    default: 300,
  },
  onVisible: {
    type: Function as PropType<() => void>,
    default: () => {},
  },
  height: {
    type: Number,
    default: 100,
  },
  width: {
    type: Number,
    default: 100,
  },
  placeholder: {
    type: Object as PropType<VueNode>,
    default: () => {},
  },
});

export const PlaceholderWithTrackingPropsFunc = () => ({
  scrollPosition: {
    type: Object as PropType<ScrollPosition>,
    default: null,
  },
  useIntersectionObserver: {
    type: Boolean,
    default: true,
  },
  threshold: {
    type: Number,
    default: 300,
  },
  onVisible: {
    type: Function as PropType<() => void>,
    default: () => {},
  },
  height: {
    type: Number,
    default: 0,
  },
  width: {
    type: Number,
    default: 0,
  },
  placeholder: {
    type: Object as PropType<VueNode>,
    default: () => {},
  },
});
