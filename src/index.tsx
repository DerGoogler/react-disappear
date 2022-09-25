import { doc, Util } from "googlers-tools";
import * as React from "react";

interface DisappearProps<C extends React.ComponentType<any>> {
  children: React.ReactNode;
  style?: Util.Undefineable<React.CSSProperties>;
  className?: string;
  /**
   * @return The current state of the disappear component
   */
  onDisappear: (visible: boolean) => void;
  /**
   * Used to wrap the inner children
   */
  wrapper: C | keyof JSX.IntrinsicElements;
  wrapperProps?: Partial<React.ComponentProps<C>>;
}

/**
 * Checks if the children are visible.
 * @required Wrapper
 * @extends {React.Component<DisappearProps>}
 */
class Disappear<C extends React.ComponentType<any>> extends React.Component<DisappearProps<C>> {
  private observer: IntersectionObserver;
  private ref: React.RefObject<Element>;

  public constructor(props: Readonly<DisappearProps<C>>) {
    super(props);
    this.ref = React.createRef<Element>();
    this.observer = new IntersectionObserver(([entry]) => {
      props.onDisappear(entry.isIntersecting);
    });
  }

  public componentDidMount() {
    doc.findRef<Element>(this.ref, ref => {
      this.observer.observe(ref);
    });
  }

  public componentWillUnmount() {
    this.observer.disconnect();
  }

  public render(): React.ReactNode {
    const { children, className, style, wrapper, wrapperProps } = this.props;
    return React.createElement(
      wrapper,
      {
        ref: this.ref,
        className: className,
        style: style,
        ...wrapperProps,
      },
      children
    );
  }
}

export { Disappear, DisappearProps };
