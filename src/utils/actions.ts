export type inViewConfig = Partial<{
  root: any;
  top: number;
  bottom: number;
  threshold: number;
}>;

export default function inView(node, callback?: ResizeObserverCallback) {
  let observer;

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
