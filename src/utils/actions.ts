type inViewConfig = Partial<{
  root: any;
  top: number;
  bottom: number;
}>;

export default function inView(
  node,
  callback?: IntersectionObserverCallback,
  params: inViewConfig = {}
) {
  let observer;

  const setObserver = (config: inViewConfig) => {
    const { root, top, bottom } = config;
    const marginTop = top ? top * -1 : 0;
    const marginBottom = bottom ? bottom * -1 : 0;
    const rootMargin = `${marginTop}px 0px ${marginBottom}px 0px`;
    const options = { root: root ?? null, rootMargin };
    if (observer) observer.disconnect();
    observer = new IntersectionObserver(callback, options);
    observer.observe(node);
  };

  setObserver(params);

  return {
    update(params) {
      setObserver(params);
    },

    destroy() {
      if (observer) observer.disconnect();
    },
  };
}
