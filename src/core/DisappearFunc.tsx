import * as React from "react";
import { DisappearProps } from "./Disappear";

function DisappearFunc({ children, style, className, onDisappear }: DisappearProps): JSX.Element {
  const ref = React.useRef<HTMLDivElement>(null);

  const observer = new IntersectionObserver(([entry]) => onDisappear(entry.isIntersecting));

  React.useEffect(() => {
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={ref} style={style} className={className}>
      {children}
    </div>
  );
}

export { DisappearFunc };
