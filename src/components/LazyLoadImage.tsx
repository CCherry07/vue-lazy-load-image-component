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
  inheritAttrs: false,
  compatConfig: { MODE: 3 },
  props: LazyLoadImagePropsFunc(),
  setup(props, { emit, attrs }) {
    const loaded = ref(false);
    function onImageLoad(): ((payload: Event) => void) | undefined {
      if (loaded.value) {
        return undefined;
      }
      return (e) => {
        emit('afterLoad', e);
        loaded.value = true;
      };
    }

    const onImageError = (e: Event) => {
      emit('imageError', e);
    };

    const onVisible = (entry: IntersectionObserverEntry) => {
      emit('visible', entry);
    };
    const onBeforeLoad = () => {
      emit('beforeLoad');
    };
    function getImg() {
      const imgProps = computed(() => {
        const {
          onAfterLoad,
          onBeforeLoad,
          onVisible,
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
          loadedClassName,
          onImageError,
          ...imgProps
        } = props;
        return imgProps;
      });
      return <img onLoad={onImageLoad()} onError={onImageError} {...imgProps.value} {...attrs} />;
    }
    function getLazyLoadImage() {
      return (
        <LazyLoadComponent
          onVisible={onVisible}
          onBeforeLoad={onBeforeLoad}
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
    function getWrappedLazyLoadImage(lazyLoadImage: ReturnType<typeof getLazyLoadImage>) {
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
