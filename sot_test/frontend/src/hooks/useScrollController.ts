import { useEffect, useRef, RefObject } from "react";

const useScrollControl = (
  shouldScroll: boolean,
  options: ScrollIntoViewOptions = { behavior: "smooth" },
  dependencies: any[] = []
): RefObject<HTMLDivElement> => {
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (shouldScroll && targetRef.current) {
      targetRef.current.scrollIntoView(options);
    }
  }, [shouldScroll, options, ...dependencies]);

  return targetRef;
};

export default useScrollControl;
