import { doc } from "googlers-tools";
import React, { useEffect, useState } from "react";

export type useDisappearFunc = <T = HTMLElement>(ref: React.MutableRefObject<T>) => boolean;
const useDisappear: useDisappearFunc = ref => {
  const [isIntersecting, setIntersecting] = useState(false);

  const observer = new IntersectionObserver(([entry]) => setIntersecting(entry.isIntersecting));

  useEffect(() => {
    doc.findRef(ref, r => {
      observer.observe(r as any);
    });
    return () => {
      observer.disconnect();
    };
  }, []);

  return isIntersecting;
};

export default useDisappear;
