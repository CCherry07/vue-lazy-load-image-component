import type { DefineComponent, ExtractPropTypes } from 'vue';
import { computed, defineComponent, ref } from 'vue';
import LazyLoadComponent from './LazyLoadComponent.jsx';
import { LazyLoadImagePropsFunc } from './interface.js';
import '../effects/index.css';
export type LazyLoadImageProps = Partial<
  ExtractPropTypes<ReturnType<typeof LazyLoadImagePropsFunc>>
> &
  Partial<Omit<HTMLImageElement, 'style'>>;

const LazyLoadImage = defineComponent({
  name: 'LazyLoadImage',
  compatConfig: { MODE: 3 },
  inheritAttrs: false,
  props: LazyLoadImagePropsFunc(),
  setup(props, { attrs }) {
    const loaded = ref(false);
    function onImageLoad() {
      if (loaded.value) {
        return null;
      }
      return () => {
        props.afterLoad?.();
        loaded.value = true;
      };
    }
    function getImg() {
      const imgProps = computed(() => {
        const {
          class: className,
          afterLoad,
          beforeLoad,
          delayMethod,
          delayTime,
          effect,
          placeholder,
          placeholderSrc,
          scrollPosition,
          threshold,
          useIntersectionObserver,
          visibleByDefault,
          wrapperClassName,
          wrapperProps,
          style,
          loadedClassName,
          ...imgProps
        } = props;
        return imgProps;
      });
      // @ts-ignore
      return <img onLoad={onImageLoad()} {...imgProps.value} {...attrs} />;
    }
    function getLazyLoadImage() {
      return (
        <LazyLoadComponent
          beforeLoad={props.beforeLoad}
          class={props.class}
          delayMethod={props.delayMethod}
          delayTime={props.delayTime}
          height={props.height}
          placeholder={props.placeholder}
          scrollPosition={props.scrollPosition}
          style={props.style}
          threshold={props.threshold}
          useIntersectionObserver={props.useIntersectionObserver}
          visibleByDefault={props.visibleByDefault}
          width={props.width}
        >
          {getImg()}
        </LazyLoadComponent>
      );
    }
    const loadedClassName = computed(() => (loaded.value ? ' lazy-load-image-loaded' : ''));
    const wrapperBackground = computed(() => {
      if (loaded.value || !props.placeholderSrc) {
        return {};
      }
      return {
        backgroundImage: `url(${props.placeholderSrc})`,
        backgroundSize: '100% 100%',
      };
    });
    function getWrappedLazyLoadImage(lazyLoadImage: any) {
      return (
        <span
          class={
            props.wrapperClassName +
            ' lazy-load-image-background ' +
            props.effect +
            loadedClassName.value
          }
          style={{
            ...wrapperBackground.value,
            color: 'transparent',
            display: 'inline-block',
            height: props.height + 'px',
            width: props.width + 'px',
          }}
          {...props.wrapperProps}
        >
          {lazyLoadImage}
        </span>
      );
    }

    return () => {
      const lazyLoadImage = getLazyLoadImage();
      const needsWrapper = (props.effect || props.placeholderSrc) && !props.visibleByDefault;
      if (!needsWrapper && !props.wrapperClassName && !props.wrapperProps) {
        return lazyLoadImage;
      }
      return getWrappedLazyLoadImage(lazyLoadImage);
    };
  },
});

export default LazyLoadImage as DefineComponent<LazyLoadImageProps>;
