import * as React from "react";
import { useEffect, useMemo, useRef } from "react";

export interface DisappearProps<T extends React.ElementType> {
  readonly as?: T;
  readonly children: React.ReactNode;
  /**
   * @return The current state of the disappear component
   */
  onDisappear(visible: boolean, ref?: React.MutableRefObject<T | null>): void;
}

export type DisappearType<T extends React.ElementType> = DisappearProps<T> & Omit<React.ComponentPropsWithoutRef<T>, keyof DisappearProps<T>>;

/**
 * Checks if the children are visible.
 * @required onChange
 */
export function Disappear<T extends React.ElementType = "div">(props: DisappearType<T>) {
  const { as, ...rest } = props;

  const ref = useRef<T | null>(null);

  const observer = useMemo(
    () =>
      new IntersectionObserver(([entry]) => {
        props.onDisappear(entry.isIntersecting, ref);
      }),
    [as]
  );

  useEffect(() => {
    if (ref.current) {
      observer.observe(ref.current as any);
    }

    return () => {
      observer.disconnect();
    };
  }, [as, observer]);

  const Component = as || "div";
  return <Component ref={ref as any} {...rest} />;
}
