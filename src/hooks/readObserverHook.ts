import { useEffect, useRef } from "react";

type Callback = () => void;

export const useReadObserver = (onRead: Callback) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          onRead(); // fire callback
          observer.disconnect(); // disconnect to avoid repeated calls
        }
      },
      {
        threshold: 0.5, // 50% visible
      },
    );

    observer.observe(ref.current); // browset will watch that element

    return () => {
      observer.disconnect();
    };
  }, [onRead]);

  return ref;
};
