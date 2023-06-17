export type inViewConfig = Partial<{
  root: any;
  top: number;
  bottom: number;
  threshold: number;
}>;

export default function inView(
  node: Element,
  callback?: ResizeObserverCallback
) {
  let observer: ResizeObserver;

  const setObserver = () => {
    if (observer) observer.disconnect();
    observer = new ResizeObserver(callback);
    observer.observe(node);
  };

  setObserver();

  return {
    update() {
      setObserver();
    },

    destroy() {
      if (observer) observer.disconnect();
    },
  };
}
