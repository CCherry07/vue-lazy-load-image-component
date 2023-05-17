export const LAZY_LOAD_OBSERVERS: { [key: string]: any } = {};

export const checkIntersections: IntersectionObserverCallback = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // @ts-ignore
      entry.target.onVisible(entry);
    }
  });
};

export const getObserver = (threshold: number | string) => {
  LAZY_LOAD_OBSERVERS[threshold] =
    LAZY_LOAD_OBSERVERS[threshold] ||
    new IntersectionObserver(checkIntersections, {
      rootMargin: threshold + 'px',
    });

  return LAZY_LOAD_OBSERVERS[threshold];
};

export const getScrollX = () =>
  typeof window === 'undefined' ? 0 : window.scrollX || window.pageXOffset;
export const getScrollY = () =>
  typeof window === 'undefined' ? 0 : window.scrollY || window.pageYOffset;
